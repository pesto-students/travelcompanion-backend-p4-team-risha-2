import { Request, Response } from "express";
import { Feed } from "../models/Feed";
import jwtService from "../services/jwt.service";

export class LikeController {

    async postLike(req: Request, res: Response) {
        try {
            const user = await jwtService.verify(req);
            const post = await Feed.findById(req.params.postId);
            if (!post) {
                return res.status(404).json({ msg: 'Feed not found' });
            }
            if (post.likes.includes(user._id)) {
                return res.status(400).json({ msg: 'Feed already liked' });
            }
            post.likes.push({userID: user._id, postID: req.params.postId});
            await post.save();
            const likes = post.likes.length;
            res.json({ likes });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
    async getLike(req: Request, res: Response) {
        try {
            const user = await jwtService.verify(req);
            const post = await Feed.findById(req.params.postId);
            if (!post) {
                return res.status(404).json({ msg: 'Feed not found' });
            }
            const likes = post.likes.length;
            const liked = post.likes.includes(user._id);
            res.json({ likes, liked });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
    // //Unlike for authorized user
    async deleteLike(req: Request, res: Response) {
        try {
            const user = await jwtService.verify(req);
            const post = await Feed.findById(req.params.postId);
            if (!post) {
                return res.status(404).json({ msg: 'Feed not found' });
            }
            const index = post.likes.findIndex(like => like.postID.toString() === req.params.postId);
            if (index === -1) {
                return res.status(400).json({ msg: 'Post has not been liked' });
            }
            post.likes.splice(index, 1);
            await post.save();
            res.json(post.likes);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }

}