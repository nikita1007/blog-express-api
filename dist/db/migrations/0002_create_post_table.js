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
exports.down = exports.up = void 0;
const _0001_create_start_tables_1 = require("./0001_create_start_tables");
const PostModel_1 = __importDefault(require("../../models/PostModel"));
function up() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, _0001_create_start_tables_1.up)();
        yield PostModel_1.default.sync();
    });
}
exports.up = up;
function down() {
    return __awaiter(this, void 0, void 0, function* () {
        yield PostModel_1.default.drop();
    });
}
exports.down = down;
//# sourceMappingURL=0002_create_post_table.js.map