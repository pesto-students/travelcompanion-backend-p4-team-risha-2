import * as mongoose from "mongoose"
import {Document, model, Model} from "mongoose"

interface ILike extends Document {
    itemID: string
    userID: string
}

const LikeSchema = new mongoose.Schema({
  itemID: String,
  userID: String,
});

export const Like: Model<ILike> = model<ILike>("Like", LikeSchema)
