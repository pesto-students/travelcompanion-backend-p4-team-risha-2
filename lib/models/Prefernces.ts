import IPrefernces from "../interfaces/prefernces"
import {Model, model, Schema} from "mongoose"

const PreferncesSchema: Schema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: false},
    Iam: {type: String, required: false},
    location: {type: String, required: false},
    gender: {type: String, required: false},
    travelInterests: {type: Array, required: false}
  })

export const Preferences: Model<IPrefernces> = model<IPrefernces>('Prefernces', PreferncesSchema)

