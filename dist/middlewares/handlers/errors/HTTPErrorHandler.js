"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
/**
 * Валидация tsoa данных передаваемых на сервер
 */
exports.default = (app) => {
    app.use(function errorHandler(err, req, res, next) {
        if (err instanceof tsoa_1.ValidateError) {
            console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
            return res.status(422).json({
                message: "Validation Failed",
                details: err === null || err === void 0 ? void 0 : err.fields,
            });
        }
        if (err instanceof Error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
        next();
    });
};
//# sourceMappingURL=HTTPErrorHandler.js.map