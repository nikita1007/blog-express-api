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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationBodyParams = exports.LoginBodyParams = void 0;
const class_validator_1 = require("class-validator");
const IsEqualTo_decorator_1 = require("./decorators/IsEqualTo.decorator");
class LoginBodyParams {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_\-.@]{3,255}$/),
    __metadata("design:type", String)
], LoginBodyParams.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z_\-%&*$#@!.?]{8,}$/),
    __metadata("design:type", String)
], LoginBodyParams.prototype, "password", void 0);
exports.LoginBodyParams = LoginBodyParams;
class RegistrationBodyParams {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_\-.@]{3,255}$/),
    __metadata("design:type", String)
], RegistrationBodyParams.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z_\-%&*$#@!.?]{8,}$/, { message: "Значение поля `confirm_password` должно содержать более 8 символов, и может содержать латинские буквы, цырфы и спецсимволы" }),
    __metadata("design:type", String)
], RegistrationBodyParams.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z_\-%&*$#@!.?]{8,}$/, { message: "Значение поля `confirm_password` должно содержать более 8 символов, и может содержать латинские буквы, цырфы и спецсимволы" }),
    (0, IsEqualTo_decorator_1.IsEqualTo)('password', { message: "Значение поля `confirm_password` не идентично значению поля `password`" }),
    __metadata("design:type", String)
], RegistrationBodyParams.prototype, "confirm_password", void 0);
exports.RegistrationBodyParams = RegistrationBodyParams;
//# sourceMappingURL=AuthTypes.js.map