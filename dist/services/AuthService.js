"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthModel_1 = __importDefault(require("../models/AuthModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const AuthHelper_1 = __importDefault(require("../helpers/AuthHelper"));
const TokenHelper_1 = __importDefault(require("../helpers/TokenHelper"));
const UserService_1 = __importDefault(require("./UserService"));
;
class AuthService {
    /**
     *
     * Метод проверяющий авторизацию токена пользователя
     *
     * @param data - {token: string} | {username: string, password: string}
     * @returns True - Если пользователь авторизирован
     * @returns False - Если пользователь не авторизирован
     */
    checkAuthorization(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.token) {
                const user = yield AuthModel_1.default.findOne({
                    attributes: ["id"],
                    where: {
                        jwt_key: data.token
                    }
                });
                if (user && user.id) {
                    return { token: user.id };
                }
                else {
                    return undefined;
                }
            }
            else if (data.username && data.password) {
                const user = yield AuthModel_1.default.findOne({
                    attributes: ["jwt_key"],
                    where: {
                        user_id: (yield UserModel_1.default.findOne({
                            attributes: ["id"],
                            where: {
                                username: data.username,
                                password: new AuthHelper_1.default().hash(data.password),
                            }
                        })).id
                    },
                    order: [['createdAt', 'DESC']]
                });
                if (user && user.jwt_key) {
                    return { token: user.jwt_key };
                }
                else {
                    return undefined;
                }
            }
        });
    }
    /**
     *
     * Метод авторизирующий пользователя
     *
     * @param username - username пользователя типа string
     * @param password - пароль пользователя типа string
     * @returns AuthModel.jwt_key
     * @returns Error Code 401 - Unauthorized. Не удалось авторизовать пользователя
     */
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (yield this.checkAuthorization({ username: username, password: password }));
            if (token && token.token) {
                return { token: token.token };
            }
            if (!new UserService_1.default().checkUserExists(username)) {
                return { error: { code: 401, message: "Такого пользователя не существует" } };
            }
            else {
                const user_id = (yield UserModel_1.default.findOne({
                    attributes: ['id'],
                    where: {
                        username: username,
                        password: new AuthHelper_1.default().hash(password)
                    },
                })).id;
                if (!user_id) {
                    return { error: { code: 401, message: "Данные для авторизации введены неверно" } };
                }
                else {
                    const token = new TokenHelper_1.default().generateJWTToken({ user_nickname: username }, {});
                    yield AuthModel_1.default.create({
                        user_id: user_id,
                        jwt_key: token,
                    });
                    return { token: token };
                }
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map