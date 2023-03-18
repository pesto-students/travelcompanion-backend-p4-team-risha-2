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
exports.PreferencesController = void 0;
const mongoose_1 = require("mongoose");
const Prefernces_1 = require("../models/Prefernces");
const jwt_service_1 = require("../services/jwt.service");
class PreferencesController {
    getPrefernces(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefernce = yield Prefernces_1.Preferences.find().populate('user').limit(10);
            res.json(prefernce);
        });
    }
    postPrefernces(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield jwt_service_1.default.verify(req);
            const prefernce = new Prefernces_1.Preferences({
                "name": req.body.name,
                "email": req.body.email,
                "phone": req.body.phone,
                "Iam": req.body.Iam,
                "location": req.body.location,
                "gender": req.body.gender,
                user: mongoose_1.Types.ObjectId(user._id),
                // this is an array of place ID not the mapPlace id
                travelInterests: req.body.travelInterests
            });
            console.log(prefernce);
            //save to db
            try {
                const prefernceData = yield prefernce.save();
                res.json(prefernceData);
                console.log(prefernceData);
            }
            catch (err) {
                res.send(err);
            }
        });
    }
    getPreferncesByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefernce = yield Prefernces_1.Preferences.findById(req.params.login_id);
            res.json(prefernce);
        });
    }
    getPreferncesBylocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefernce = yield Prefernces_1.Preferences.find({ location: req.params.location });
            res.json(prefernce);
        });
    }
    deletePreferences(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefernce = yield Prefernces_1.Preferences.findById(req.params.id);
            prefernce.name = req.body.name;
            const p1 = yield prefernce.remove();
            res.json(p1);
        });
    }
    patchPrefernces(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefernce = yield Prefernces_1.Preferences.findById(req.params.id);
            prefernce.name = req.body.name;
            const p1 = yield prefernce.save();
            res.json(p1);
        });
    }
}
exports.PreferencesController = PreferencesController;
