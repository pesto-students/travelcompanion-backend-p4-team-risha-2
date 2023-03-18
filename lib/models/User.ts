import * as mongoose from "mongoose"
import {Document, model, Model} from "mongoose"

interface IUser extends Document {
  username: string
  password: string
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

export const User: Model<IUser> = model<IUser>("User", userSchema)
