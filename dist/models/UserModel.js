"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const BaseModel_1 = require("./BaseModel");
const database_1 = __importDefault(require("../db/database"));
class User extends sequelize_1.Model {
}
User.init(Object.assign(Object.assign({}, BaseModel_1.baseModelAttributes), { username: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true
    }, password: {
        type: sequelize_1.DataTypes.STRING(64),
        allowNull: false
    } }), {
    tableName: 'user',
    sequelize: database_1.default
});
exports.default = User;
//# sourceMappingURL=UserModel.js.map