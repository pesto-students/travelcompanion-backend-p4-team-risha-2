"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = void 0;
const mongoose_1 = require("mongoose");
const feedSchema = new mongoose_1.Schema({
    body: { type: String, required: false },
    images: { type: String, required: false },
    author: { type: mongoose_1.Schema.Types.ObjectId, required: false, ref: 'User' },
    createdOn: { type: Date, required: false },
    likes: { type: Array, required: false },
    name: { type: String, required: false },
});
exports.Feed = (0, mongoose_1.model)('Feed', feedSchema);
