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
exports.LikeController = void 0;
const Feed_1 = require("../models/Feed");
const jwt_service_1 = require("../services/jwt.service");
class LikeController {
    postLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield jwt_service_1.default.verify(req);
                const post = yield Feed_1.Feed.findById(req.params.postId);
                if (!post) {
                    return res.status(404).json({ msg: 'Feed not found' });
                }
                if (post.likes.includes(user._id)) {
                    return res.status(400).json({ msg: 'Feed already liked' });
                }
                post.likes.push({ userID: user._id, postID: req.params.postId, likeNumber: post.likes.length, likedBy: req.params.name });
                yield post.save();
                const likes = post.likes.length;
                res.json({ likes });
            }
            catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
            }
        });
    }
    getLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield jwt_service_1.default.verify(req);
                console.log(user);
                const post = yield Feed_1.Feed.findById(req.params.postId);
                if (!post) {
                    return res.status(404).json({ msg: 'Feed not found' });
                }
                const likes = post.likes.length;
                const liked = post.likes.includes(user._id);
                // const userName = post.likes.userName
                res.json({ likes, liked });
            }
            catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
            }
        });
    }
    // //Unlike for authorized user
    deleteLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield jwt_service_1.default.verify(req);
                const post = yield Feed_1.Feed.findById(req.params.postId);
                if (!post) {
                    return res.status(404).json({ msg: 'Feed not found' });
                }
                const index = post.likes.findIndex(like => like.postID.toString() === req.params.postId);
                if (index === -1) {
                    return res.status(400).json({ msg: 'Post has not been liked' });
                }
                post.likes.splice(index, 1);
                yield post.save();
                res.json(post.likes);
            }
            catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
            }
        });
    }
}
exports.LikeController = LikeController;
