"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostValidationModel = void 0;
const superstruct_1 = require("superstruct");
exports.UserPostValidationModel = (0, superstruct_1.object)({
    name: (0, superstruct_1.string)(),
    email: (0, superstruct_1.string)(),
    password: (0, superstruct_1.string)(),
});
