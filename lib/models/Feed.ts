import {model, Model, Schema} from "mongoose";

const feedSchema = new Schema({
  body: {type: String, required: false},
  images: {type: String, required: false},
  author: {type: Schema.Types.ObjectId, required: false, ref: 'User'},
  createdOn: {type: Date, required: false},
  likes: {type: Array, required: false},
  name: {type: String, required: false},
})

interface IFeed {
  body: string
  images: string
  author: string
  createdOn: Date
  likes: [{userID: String, postID: String, likeNumber: number, likedBy: String}]
  name: string
}

export const Feed: Model<IFeed> = model<IFeed>('Feed', feedSchema)
