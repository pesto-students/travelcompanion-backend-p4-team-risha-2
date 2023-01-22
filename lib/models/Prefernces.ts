import IPrefernces from "interfaces/prefernces"
import {Model, model, Schema} from "mongoose"

const PreferncesSchema: Schema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    Iam: {type: String, required: true},
    location: {type: String, required: true},
    gender: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    travelInterests: {type: Array, required: true}
  })

export const Preferences: Model<IPrefernces> = model<IPrefernces>('Prefernces', PreferncesSchema)

