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
const constants_1 = require("../constants");
const jwt = require("jsonwebtoken");
const User_1 = require("../models/User");
class JwtService {
    sign(data) {
        return jwt.sign(data, constants_1.JWT_SECRET);
    }
    verify(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const verify = jwt.verify(token, constants_1.JWT_SECRET);
                if (!verify) {
                    throw new Error('Invalid token');
                }
                const { id } = verify;
                const user = yield User_1.User.findOne({ _id: id });
                if (!user) {
                    throw new Error('Invalid user');
                }
                return user;
            }
            catch (err) {
                throw (err);
            }
        });
    }
}
const jwtService = new JwtService();
exports.default = jwtService;
