"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_cfg = void 0;
const config_1 = __importDefault(require("../config"));
exports.db_cfg = {
    dialect: config_1.default.DB_DRIVER || 'postgres',
    username: config_1.default.DB_USERNAME,
    password: config_1.default.DB_PASSWORD,
    hostname: config_1.default.DB_HOSTNAME,
    port: Number.parseInt(config_1.default.DB_PORT || "5432"),
    db_name: config_1.default.DB_NAME,
};
//# sourceMappingURL=config.js.map