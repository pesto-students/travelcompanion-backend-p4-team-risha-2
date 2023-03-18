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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const constants_1 = require("../constants");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../config/passport");
const jwt_service_1 = require("../services/jwt.service");
const Prefernces_1 = require("../models/Prefernces");
class AuthenticationController {
    hello(req, res, next) {
        res.send("hello");
    }
    loginSuccess(req, res, next) {
        Prefernces_1.Preferences.findOne({ email: req.body.username }, (err, user) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                throw err;
            if (!user)
                res.status(401).send("No User Exists");
            const password = user.password;
            const verify = yield bcrypt.compare(req.body.password, password);
            if (verify) {
                const body = { id: user._id };
                const token = jwt.sign(body, constants_1.JWT_SECRET);
                res.json({
                    userId: user._id,
                    token: token
                });
            }
            else {
                res.status(403).send("Invalid Credentials");
            }
        }));
    }
    register(req, res) {
        Prefernces_1.Preferences.findOne({ username: req.body.username }, (err, doc) => __awaiter(this, void 0, void 0, function* () {
            // if (err) throw err;
            if (doc)
                res.send("User Already Exists");
            if (!doc) {
                const hashedPassword = yield bcrypt.hash(req.body.password, 10);
                const newUser = new Prefernces_1.Preferences({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    name: req.body.username,
                    "phone": req.body.phone,
                    "Iam": req.body.Iam,
                    "location": req.body.location,
                    "gender": req.body.gender,
                    // // this is an array of place ID not the mapPlace id
                    travelInterests: req.body.travelInterests
                });
                yield newUser.save();
                res.send("User Created");
            }
        }));
    }
    meUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield jwt_service_1.default.verify(req);
                const _a = user._doc, { password } = _a, rest = __rest(_a, ["password"]);
                res.json({ user: Object.assign({}, rest) });
            }
            catch (e) {
                res.status(401).send(e.message);
            }
        });
    }
    allUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefernce = yield Prefernces_1.Preferences.find().populate('user');
            res.json(prefernce);
        });
    }
}
exports.AuthenticationController = AuthenticationController;
