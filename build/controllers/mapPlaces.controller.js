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
exports.MapPlacesController = void 0;
const MapPlaces_1 = require("../models/MapPlaces");
const Prefernces_1 = require("../models/Prefernces");
class MapPlacesController {
    postmapPlaces(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mapPlaces = new MapPlaces_1.default({
                "location": req.body.location,
                "placeId": req.body.location.place_id,
                "address": req.body.location.formatted_address,
            });
            //save to db
            try {
                const previousPlaces = yield MapPlaces_1.default.findOne({ placeId: req.body.location.place_id });
                if (!previousPlaces) {
                    const mapPlacesData = yield mapPlaces.save();
                    res.json([]);
                }
                const users = yield Prefernces_1.Preferences.find({ travelInterests: req.body.location.place_id }).populate('user');
                res.json(users);
            }
            catch (err) {
                res.send(err);
            }
        });
    }
    getBuddiesBasedonLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefernce = yield MapPlaces_1.default.findById(req.params.login_id);
            res.json(prefernce);
        });
    }
}
exports.MapPlacesController = MapPlacesController;
