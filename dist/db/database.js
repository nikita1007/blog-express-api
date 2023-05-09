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
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_url = exports.test_connection = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const url = `${config_1.db_cfg.dialect}://${config_1.db_cfg.username}:${config_1.db_cfg.password}@${config_1.db_cfg.hostname}:${config_1.db_cfg.port}/${config_1.db_cfg.db_name}`;
const database = new sequelize_1.Sequelize(url, {
    logging: false
});
function print_url() {
    return __awaiter(this, void 0, void 0, function* () {
        return url;
    });
}
exports.print_url = print_url;
function test_connection(database) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database.authenticate();
            return 'Connection has been established successfully.';
        }
        catch (error) {
            return `Unable to connect to the database: ${error}`;
        }
    });
}
exports.test_connection = test_connection;
exports.default = database;
//# sourceMappingURL=database.js.map