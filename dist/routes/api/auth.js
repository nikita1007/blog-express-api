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
const AuthController_1 = __importDefault(require("../../controllers/AuthController"));
const AuthorizationMiddleware_1 = require("../../middlewares/AuthorizationMiddleware");
const JWTTokenMiddleware_1 = require("../../middlewares/JWTTokenMiddleware");
const router = (0, express_1.Router)();
router.post("/login", [JWTTokenMiddleware_1.validateJWTTokenIfExistsMiddleware], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new AuthController_1.default();
    const response = yield controller.login(req.body);
    res.json(response);
}));
router.post("/registration", [AuthorizationMiddleware_1.validateRegistrationRequestBody], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new AuthController_1.default();
    const response = yield controller.registration(req.body);
    res.json(response);
}));
router.use("/auth", router);
exports.default = router;
//# sourceMappingURL=auth.js.map