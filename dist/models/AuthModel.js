"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const BaseModel_1 = require("./BaseModel");
const database_1 = __importDefault(require("../db/database"));
const UserModel_1 = __importDefault(require("./UserModel"));
class Auth extends sequelize_1.Model {
}
Auth.init(Object.assign(Object.assign({}, BaseModel_1.baseModelAttributes), { user_id: {
        type: sequelize_1.DataTypes.INTEGER(),
        unique: true,
        references: {
            model: UserModel_1.default,
            key: "id",
        }
    }, jwt_key: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    } }), {
    tableName: 'auth',
    sequelize: database_1.default
});
exports.default = Auth;
//# sourceMappingURL=AuthModel.js.map