"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWTTokenIfExistsMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenHelper_1 = __importDefault(require("../helpers/TokenHelper"));
/**
 * Middleware проверяющий валидность JWT токена
 */
const validateJWTTokenIfExistsMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const [type, token] = new TokenHelper_1.default().getHeaderTypeAndToken(authHeader);
        if (type !== 'Bearer' || !token) {
            return res.status(401).json({ error: 'Invalid authorization format' });
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.APP_SECRET_KEY);
            const reqUser = decodedToken;
            next();
        }
        catch (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    }
    else {
        next();
    }
};
exports.validateJWTTokenIfExistsMiddleware = validateJWTTokenIfExistsMiddleware;
//# sourceMappingURL=JWTTokenMiddleware.js.map