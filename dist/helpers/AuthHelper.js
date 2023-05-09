"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class AuthHelper {
    constructor() {
        this.hash_type = "sha256";
        this.digest = "base64";
    }
    /**
     *
     * Метод хеширующий текст передаваемый в него
     *
     * @param text - текст, который будет хешироваться
     * @returns hash типа string
     */
    hash(text) {
        return crypto_1.default.createHash(this.hash_type).digest(this.digest);
    }
    /**
     *
     * Метод проверяющий эквивалентность захешированного текста и параметра hash
     *
     * @param text - текст, который будет проверяться с hash-ем
     * @param hash - hash code
     * @returns true | false
     */
    checkHash(text, hash) {
        return crypto_1.default.createHash(this.hash_type).digest(this.digest) === hash;
    }
}
exports.default = AuthHelper;
//# sourceMappingURL=AuthHelper.js.map