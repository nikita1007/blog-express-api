"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ping_1 = __importDefault(require("./ping"));
const auth_1 = __importDefault(require("./auth"));
const post_1 = __importDefault(require("./post"));
const router = (0, express_1.Router)();
router.use("/api", auth_1.default, post_1.default, ping_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map