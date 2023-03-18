"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
