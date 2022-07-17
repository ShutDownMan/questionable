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
exports.userPostHandler = void 0;
const superstruct_1 = require("superstruct");
const user_1 = require("../../controller/user/user");
const user_2 = require("../../model/user/user");
function userPostHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        /// validate req.body
        let reqBody = req.body;
        try {
            (0, superstruct_1.assert)(reqBody, user_2.UserPostValidationModel);
        }
        catch (error) {
            res.status(400).send(error);
            return;
        }
        /// call controller function
        let newUser = (0, user_1.insertUser)(Object.assign({ id: undefined }, reqBody));
        /// send response
        res.status(202).send(newUser);
    });
}
exports.userPostHandler = userPostHandler;
