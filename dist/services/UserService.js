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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const crypto_1 = __importDefault(require("crypto"));
class UserService {
    /**
     *
     * @param username
     * @returns True - Если пользователь уже существует в БД
     * @returns False - Если пользователь не существует в БД
     */
    checkUserExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.default.findOne({
                attributes: ['id'],
                where: {
                    username: username,
                }
            });
            return Boolean(user);
        });
    }
    /**
     *
     * @param username
     * @param password
     * @returns UserModel.username
     * @returns Error Code 409 - Conflict. Означает, что пользователь в БД уже существует.
     */
    createUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkUserExists(username))
                return {
                    error: {
                        code: 409,
                        message: "Такой пользователь уже существует",
                    }
                };
            const user = yield UserModel_1.default.create({ username: username, password: crypto_1.default.createHash("sha256").digest("base64") });
            return { username: username, password: password };
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map