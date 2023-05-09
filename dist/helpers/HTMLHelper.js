"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHtml = void 0;
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}
exports.escapeHtml = escapeHtml;
//# sourceMappingURL=HTMLHelper.js.map