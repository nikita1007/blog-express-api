"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseModelAttributes = void 0;
const sequelize_1 = require("sequelize");
exports.baseModelAttributes = {
    id: {
        type: sequelize_1.DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE(),
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE(),
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }
};
//# sourceMappingURL=BaseModel.js.map