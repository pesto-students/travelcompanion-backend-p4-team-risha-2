import {model, Model, Schema} from "mongoose";

const feedSchema = new Schema({
  body: {type: String, required: false},
  images: {type: Array, required: false},
  author: {type: Schema.Types.ObjectId, required: false, ref: 'User'},
  createdOn: {type: Date, required: false},
  likes: {type: Array, required: false},
})

interface IFeed {
  body: string
  images: string[]
  author: string
  createdOn: Date
  likes: string[]
}

export const Feed: Model<IFeed> = model<IFeed>('Feed', feedSchema)
