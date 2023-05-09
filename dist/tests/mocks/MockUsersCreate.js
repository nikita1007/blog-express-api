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
const UserService_1 = __importDefault(require("../../services/UserService"));
const AuthService_1 = __importDefault(require("../../services/AuthService"));
const fake_users = [
    { "username": "badamik0", "password": "tlgwX19M" },
    { "username": "kjubb1", "password": "ibnDrr1zkRzU" },
    { "username": "dstigger2", "password": "9xyLYg5I6k51" },
    { "username": "vodrought3", "password": "uQ2utLzEH" },
    { "username": "mbrandham4", "password": "wiklsV" }
];
for (let i = 0; i < 5; i++) {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield new UserService_1.default().createUser(fake_users[i].username, fake_users[i].password);
        if (user.hasOwnProperty('error')) {
            console.log(user);
        }
        else {
            const token = (yield new AuthService_1.default().login(user.username, user.password));
            if (token.hasOwnProperty('error')) {
                console.log(token);
            }
        }
    }))();
}
console.log("Пользователи были успешно созданы и авторизированы!");
//# sourceMappingURL=MockUsersCreate.js.map