import IPrefernces from "interfaces/prefernces"
import { Schema } from "mongoose"
import * as mongoose from "mongoose"

const PreferncesSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        Iam: { type: String, required: true },
        location: { type: String, required: true },
        gender: { type: String, required: true },
        login_id: { type: String, required: false },
        // intrest: { type: String, required: false },
    })

export default mongoose.model<IPrefernces>('Prefernces', PreferncesSchema)

