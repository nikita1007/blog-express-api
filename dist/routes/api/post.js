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
const AuthorizationMiddleware_1 = require("../../middlewares/AuthorizationMiddleware");
const JWTTokenMiddleware_1 = require("../../middlewares/JWTTokenMiddleware");
const PostController_1 = __importDefault(require("../../controllers/PostController"));
const PostMiddleware_1 = require("../../middlewares/PostMiddleware");
const router = (0, express_1.Router)();
const controller = new PostController_1.default();
router.use("/posts", [JWTTokenMiddleware_1.validateJWTTokenIfExistsMiddleware, AuthorizationMiddleware_1.authenticateUserMiddleware]);
router.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = req.query;
    const response = yield controller.getPosts(options.limit, options.page, options.order);
    res.json(response);
}));
router.get("/posts/:post_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield controller.getPost(Number.parseInt(req.params.post_id));
    res.json(response);
}));
router.post("/posts", [PostMiddleware_1.validatePostCreateRequestBody], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield controller.createPost(req.body, req.headers.authorization);
    res.json(response);
}));
router.patch("/posts/:post_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield controller.patchPost(Number.parseInt(req.params.post_id), req.body, req.headers.authorization);
    res.json(response);
}));
router.delete("/posts/:post_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield controller.deletePost(Number.parseInt(req.params.post_id), req.headers.authorization);
    res.json(response);
}));
exports.default = router;
//# sourceMappingURL=post.js.map