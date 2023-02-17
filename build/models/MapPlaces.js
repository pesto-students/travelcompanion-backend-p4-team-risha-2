"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const MapPlacesSchema = new mongoose_1.Schema({
    location: { type: Object, required: true },
    placeId: { type: String, required: true },
    address: { type: String, required: true },
});
exports.default = mongoose.model('MapPlaces', MapPlacesSchema);
