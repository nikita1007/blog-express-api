"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.dirname(__filename) + "/../.env" });
class TokenHelper {
    /**
     *
     * Создание JWT токена
     *
     * @param payload - данные, которые будут находится в токене
     * @param options - дополнительные опции к формированию токена
     * @returns токен формата string
     */
    generateJWTToken(payload, options = {}) {
        return jsonwebtoken_1.default.sign(payload, process.env.APP_SECRET_KEY, options);
    }
    /**
     *
     * Метод проверяющий валидность JWT токена
     *
     * @param token - токен формата string
     * @returns True - елси токен верифицирован
     * @returns JWTError - "TokenExpiredError" если время жизни токена истекло | "JsonWebTokenError" если токен не валиден
     */
    checkJWTToken(token) {
        try {
            return Boolean(jsonwebtoken_1.default.verify(token, process.env.APP_SECRET_KEY));
        }
        catch (error) {
            if (["JsonWebTokenError", "TokenExpiredError"].indexOf(error.name) !== -1) {
                return { error: {
                        type: error.name,
                        message: error.message
                    } };
            }
        }
    }
    /**
     *
     * @param header - принимает строку Authorization из заголовка запроса
     *
     * @returns res - массив строк формата [type: string, token: string]
     */
    getHeaderTypeAndToken(header) {
        return header.split(' ');
    }
    /**
     *
     * @param header - принимает строку Authorization из заголовка запроса
     * @returns token - jwt токен
     */
    getHeaderToken(header) {
        return header.split(' ')[1];
    }
    /**
     *
     * Декодирование токена
     *
     * @param token  - токен формата string
     * @returns Декодируемый объект данных
     */
    decodeJWT(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.default = TokenHelper;
//# sourceMappingURL=TokenHelper.js.map