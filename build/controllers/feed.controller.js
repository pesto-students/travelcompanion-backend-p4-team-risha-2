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
exports.FeedController = void 0;
const Feed_1 = require("../models/Feed");
const jwt_service_1 = require("../services/jwt.service");
class FeedController {
    getFeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //   const feeds = await Feed.find().populate('author').limit(50);
            //   res.json(feeds)
            // } catch (e) {
            //   res.status(500).send(e.message)
            // }
            const feeds = yield Feed_1.Feed.aggregate([
                { $sort: { createdOn: -1 } },
                { $limit: 50 } // Limit the results to the first document
            ], function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    const feed = result;
                    res.json(feed);
                }
            });
        });
    }
    postFeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield jwt_service_1.default.verify(req);
                const newFeed = new Feed_1.Feed({
                    body: req.body.body,
                    images: req.body.images,
                    author: user._id,
                    name: req.body.author,
                    createdOn: new Date(),
                    likes: [],
                });
                const savedFeed = yield newFeed.save();
                res.json(savedFeed);
            }
            catch (err) {
                res.send(err);
            }
        });
    }
    getFeedById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefernce = yield Feed_1.Feed.findById(req.params.login_id);
            res.json(prefernce);
        });
    }
    deleteFeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    updateFeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.FeedController = FeedController;
