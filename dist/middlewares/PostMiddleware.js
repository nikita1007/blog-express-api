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
exports.validatePostPatchRequestBody = exports.validatePostCreateRequestBody = void 0;
const PostTypes_1 = require("../types/PostTypes");
const class_validator_1 = require("class-validator");
// Валидация принимаемых данных от клиента на эндпоинт post.create
const validatePostCreateRequestBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = new PostTypes_1.CreatePostBodyParams();
    Object.assign(body, req.body);
    const errors = yield (0, class_validator_1.validate)(body); // валидируем данные по классу данных
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    else {
        next();
    }
});
exports.validatePostCreateRequestBody = validatePostCreateRequestBody;
// Валидация принимаемых данных от клиента на эндпоинт post.patch
const validatePostPatchRequestBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = new PostTypes_1.PatchPostBodyParams();
    Object.assign(body, req.body);
    const errors = yield (0, class_validator_1.validate)(body); // валидируем данные по классу данных
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    else {
        next();
    }
});
exports.validatePostPatchRequestBody = validatePostPatchRequestBody;
//# sourceMappingURL=PostMiddleware.js.map