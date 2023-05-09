"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const tsoa_1 = require("tsoa");
const PostService_1 = __importDefault(require("../services/PostService"));
const PostTypes_1 = require("../types/PostTypes");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const TokenHelper_1 = __importDefault(require("../helpers/TokenHelper"));
let PostController = class PostController {
    getPosts(limit, page, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = { limit, page, order };
            const posts = (yield new PostService_1.default().get(options)).posts;
            const posts_page_count = (yield new PostService_1.default().getPagesCount(options.limit)).count;
            return { posts: posts, page_count: posts_page_count };
        });
    }
    getPost(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = { post_id: post_id };
            const post = (yield new PostService_1.default().get(options)).posts;
            return post;
        });
    }
    createPost(bodyParams, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const token_helper = new TokenHelper_1.default();
            const _token = token_helper.decodeJWT(token_helper.getHeaderToken(token));
            const author_id = (yield UserModel_1.default.findOne({
                attributes: ["id"],
                where: {
                    username: _token.user_nickname,
                }
            })).id;
            const params = { text: bodyParams.text, title: bodyParams.title, author: author_id };
            try {
                const res = yield new PostService_1.default().create(params);
                return res;
            }
            catch (error) {
                return error;
            }
        });
    }
    deletePost(post_id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const token_helper = new TokenHelper_1.default();
            const _token = token_helper.decodeJWT(token_helper.getHeaderToken(token));
            const author_id = (yield UserModel_1.default.findOne({
                attributes: ["id"],
                where: {
                    username: _token.user_nickname,
                }
            })).id;
            try {
                const res = yield new PostService_1.default().delete(post_id, author_id);
                return res;
            }
            catch (error) {
                return error;
            }
        });
    }
    patchPost(post_id, data, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const token_helper = new TokenHelper_1.default();
            const _token = token_helper.decodeJWT(token_helper.getHeaderToken(token));
            const author_id = (yield UserModel_1.default.findOne({
                attributes: ["id"],
                where: {
                    username: _token.user_nickname,
                }
            })).id;
            try {
                const res = yield new PostService_1.default().patch(post_id, data, author_id);
                return res;
            }
            catch (error) {
                return error;
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)('/posts'),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPosts", null);
__decorate([
    (0, tsoa_1.Get)('/posts/{post_id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    (0, tsoa_1.Post)('/posts'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Header)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostTypes_1.ICreatePostBodyParams, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, tsoa_1.Delete)('/posts/{post_id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Header)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, tsoa_1.Patch)('/posts/{post_id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Header)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "patchPost", null);
PostController = __decorate([
    (0, tsoa_1.Tags)('posts'),
    (0, tsoa_1.Route)('/api/')
], PostController);
exports.default = PostController;
//# sourceMappingURL=PostController.js.map