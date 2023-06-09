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
const express_1 = require("express");
const PingController_1 = __importDefault(require("../../controllers/PingController"));
const router = (0, express_1.Router)();
router.route("/ping/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new PingController_1.default();
    const response = yield controller.get();
    return res.send(response);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new PingController_1.default();
    const response = yield controller.post();
    return res.send(response);
}));
exports.default = router;
//# sourceMappingURL=ping.js.map