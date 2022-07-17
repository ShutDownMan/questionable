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
exports.insertUser = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const crypto_1 = require("crypto");
const bcryptjs_1 = require("bcryptjs");
function insertUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = prisma_1.default.getInstance().prisma;
        let salt = (0, crypto_1.randomUUID)();
        let u_hash = yield (0, bcryptjs_1.hash)(user.password, salt);
        const newUser = yield prisma.user.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                name: user.name,
                email: user.email,
                password: u_hash,
                salt: salt,
            },
        });
        return newUser;
    });
}
exports.insertUser = insertUser;
