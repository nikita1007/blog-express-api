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
const PostModel_1 = __importDefault(require("../models/PostModel"));
const HTMLHelper_1 = require("../helpers/HTMLHelper");
const UserModel_1 = __importDefault(require("../models/UserModel"));
class PostService {
    constructor(options) {
        this.limit = 20;
        this.page = 1;
        this.order = "ASC";
        if ((options === null || options === void 0 ? void 0 : options.limit) !== undefined)
            this.limit = options.limit;
        if ((options === null || options === void 0 ? void 0 : options.page) !== undefined)
            this.page = options.page;
        if ((options === null || options === void 0 ? void 0 : options.order) !== undefined)
            this.order = options.order;
    }
    /**
     *
     * Возвращает записи постов из БД
     *
     * @param options - параметры (необязательные)
     * @param options.limit - количество записей выводимых на странице (default: 20)
     * @param options.page - страница записей (defult: 1, startsFrom: 1)
     * @param options.order - порядок вывода записей (args: "DESC" | "ASC")(defult: "DESC")
     */
    get(options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if ((options === null || options === void 0 ? void 0 : options.post_id) !== undefined) {
                const post = yield PostModel_1.default.findOne({
                    where: {
                        id: options.post_id,
                    },
                });
                const res = post;
                res.author = (yield UserModel_1.default.findOne({
                    attributes: ['username'],
                    where: {
                        id: res.author
                    }
                })).username;
                return { posts: res };
            }
            else {
                const limit = (_a = options.limit) !== null && _a !== void 0 ? _a : this.limit;
                const page = (_b = options.page) !== null && _b !== void 0 ? _b : this.page;
                const order = (_c = options.order) !== null && _c !== void 0 ? _c : this.order;
                const posts = yield PostModel_1.default.findAll({
                    offset: limit * (page - 1),
                    limit: limit,
                    order: [['createdAt', order]],
                });
                const res = posts;
                for (let i = 0; i < res.length; i++) {
                    res[i].author = (yield UserModel_1.default.findOne({
                        attributes: ['username'],
                        where: {
                            id: res[i].author
                        }
                    })).username;
                }
                return { posts: res };
            }
        });
    }
    /**
     *
     * Выводит масимальное количество страниц
     *
     * @param _limit - количество записей выводимых на странице (default: 20)
     * @returns count - number
     */
    getPagesCount(_limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = _limit !== undefined ? _limit : this.limit;
            const page_count = Math.ceil((yield PostModel_1.default.count()) / limit);
            return { count: page_count };
        });
    }
    /**
     *
     * Создание поста
     *
     * @param params
     * @returns
     */
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield PostModel_1.default.create({
                    title: params.title,
                    text: (0, HTMLHelper_1.escapeHtml)(params.text),
                    author: params.author
                });
                return { code: 201, message: 'Пост был успешно создан' };
            }
            catch (error) {
                return { code: 403, message: 'Ошибка валидации данных', error: error };
            }
        });
    }
    /**
     *
     * Удаление поста из БД
     *
     * @param id - ID поста
     * @param author - id пользователя
     * @returns
     */
    delete(id, author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield PostModel_1.default.destroy({
                    where: {
                        id: id,
                        author: author
                    }
                });
                if (res === 1) {
                    return { code: 200, message: 'Пост был успешно удален' };
                }
                else {
                    return { code: 200, message: 'Вы не являетесь владельцем поста, потому не можете его удалить' };
                }
            }
            catch (error) {
                return { code: 403, message: 'Пост не был удален', error: error };
            }
        });
    }
    /**
     *
     * Изменение поста из БД
     *
     * @param id - ID поста
     * @param author - id пользователя
     * @returns
     */
    patch(id, data, author) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((data === null || data === void 0 ? void 0 : data.text) === undefined && (data === null || data === void 0 ? void 0 : data.title) === undefined) {
                return { code: 400, message: "Данные для изменения поста не переданы. Request.Body должен содержать хотябы одно из полей: `text`, `title`" };
            }
            const post = yield PostModel_1.default.findOne({
                attributes: ["title", "text"],
                where: {
                    id: id,
                    author: author
                }
            });
            if (post) {
                const temp = {
                    text: post.text,
                    title: post.title
                };
                const text = (_a = data === null || data === void 0 ? void 0 : data.text) !== null && _a !== void 0 ? _a : temp.text;
                const title = (_b = data === null || data === void 0 ? void 0 : data.title) !== null && _b !== void 0 ? _b : temp.title;
                try {
                    yield PostModel_1.default.update({
                        text: (0, HTMLHelper_1.escapeHtml)(text),
                        title: title
                    }, {
                        where: {
                            id: id,
                            author: author,
                        }
                    });
                    return { code: 200, message: 'Пост был успешно изменен' };
                }
                catch (error) {
                    return { code: 403, message: 'Пост не был изменен', error: error };
                }
            }
            else {
                return { code: 200, message: 'Вы не являетесь владельцем поста, потому не можете его изменять' };
            }
        });
    }
}
exports.default = PostService;
//# sourceMappingURL=PostService.js.map