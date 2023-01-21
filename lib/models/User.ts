import * as mongoose from "mongoose"

const User = new mongoose.Schema({
  username: String,
  password: String,
});

export default mongoose.model("User", User)
