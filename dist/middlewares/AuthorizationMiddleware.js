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
exports.validateRegistrationRequestBody = exports.authenticateUserMiddleware = void 0;
const AuthTypes_1 = require("../types/AuthTypes");
const class_validator_1 = require("class-validator");
const TokenHelper_1 = __importDefault(require("../helpers/TokenHelper"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
// Проверка аутентификации пользователя посредством Bearer JWT токена
const authenticateUserMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header not found' });
    }
    const token = new TokenHelper_1.default().getHeaderToken(authHeader);
    const db_auth_exist = new AuthService_1.default().checkAuthorization({ token: token });
    if (!db_auth_exist) {
        return res.status(401).json({ error: 'Token unathorized' });
    }
    next();
};
exports.authenticateUserMiddleware = authenticateUserMiddleware;
// Валидация принимаемых данных от клиента на эндпоинт auth.registration
const validateRegistrationRequestBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = new AuthTypes_1.RegistrationBodyParams();
    Object.assign(body, req.body);
    const errors = yield (0, class_validator_1.validate)(body); // валидируем данные по классу данных
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    else {
        next();
    }
});
exports.validateRegistrationRequestBody = validateRegistrationRequestBody;
//# sourceMappingURL=AuthorizationMiddleware.js.map