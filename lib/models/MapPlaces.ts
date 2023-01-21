import IMapPlaces from "../interfaces/mapPlaces"
import { Schema } from "mongoose"
import * as mongoose from "mongoose"

const MapPlacesSchema: Schema = new Schema(
    {
        location: { type: String, required: true },
    })

export default mongoose.model<IMapPlaces>('MapPlaces', MapPlacesSchema)

