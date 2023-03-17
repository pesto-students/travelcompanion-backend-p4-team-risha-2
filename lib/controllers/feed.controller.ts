import {Request, Response} from "express";
import {Feed} from "../models/Feed";
import jwtService from "../services/jwt.service";

export class FeedController {

  async getFeed(req: Request, res: Response) {
    // try {
    //   const feeds = await Feed.find().populate('author').limit(50);
    //   res.json(feeds)
    // } catch (e) {
    //   res.status(500).send(e.message)
    // }
    const feeds = await Feed.aggregate([
      { $sort: { createdOn: -1 } }, // Sort by date in descending order
      { $limit: 50 } // Limit the results to the first document
    ], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        const feed = result;
        res.json(feed)
      }
    });
  }

  async postFeed(req: Request, res: Response) {
    try {
      const user = await jwtService.verify(req);
      const newFeed = new Feed({
        body: req.body.body,
        images: req.body.images,
        author: user._id,
        name: req.body.name,
        createdOn: new Date(),
        likes: [],
      })
      const savedFeed = await newFeed.save();
      res.json(savedFeed)
      console.log(savedFeed)

    } catch (err) {
      res.send(err)
    }
  }

  async getFeedById(req, res) {
    const prefernce = await Feed.findById(req.params.login_id);
    res.json(prefernce)
  }

  async deleteFeed(req, res) {
  }

  async updateFeed(req, res) {
  }
}
