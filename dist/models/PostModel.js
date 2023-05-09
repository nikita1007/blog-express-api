"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const BaseModel_1 = require("./BaseModel");
const database_1 = __importDefault(require("../db/database"));
const UserModel_1 = __importDefault(require("./UserModel"));
class Post extends sequelize_1.Model {
}
Post.init(Object.assign(Object.assign({}, BaseModel_1.baseModelAttributes), { title: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
    }, text: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }, author: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: UserModel_1.default,
            key: 'id',
        }
    } }), {
    tableName: 'post',
    sequelize: database_1.default
});
exports.default = Post;
//# sourceMappingURL=PostModel.js.map