"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preferences = void 0;
const mongoose_1 = require("mongoose");
const PreferncesSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    Iam: { type: String, required: false },
    location: { type: String, required: false },
    gender: { type: String, required: false },
    travelInterests: { type: Array, required: false }
});
exports.Preferences = (0, mongoose_1.model)('Prefernces', PreferncesSchema);
