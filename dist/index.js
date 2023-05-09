"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const api_1 = __importDefault(require("./routes/api"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const HTTPErrorHandler_1 = __importDefault(require("./middlewares/handlers/errors/HTTPErrorHandler"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const PORT = config_1.default.PORT;
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.static("public"));
(0, HTTPErrorHandler_1.default)(app);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
app.use(api_1.default);
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map