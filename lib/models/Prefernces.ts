import IPrefernces from "interfaces/prefernces"
import mongoose, { Schema } from "mongoose"

const PreferncesSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true }
    })

export default mongoose.model<IPrefernces>('Prefernces', PreferncesSchema)

