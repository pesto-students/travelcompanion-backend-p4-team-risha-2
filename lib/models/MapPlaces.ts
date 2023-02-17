import IMapPlaces from "../interfaces/mapPlaces"
import * as mongoose from "mongoose"
import {Schema} from "mongoose"

const MapPlacesSchema: Schema = new Schema(
  {
    location: {type: Object, required: true},
    placeId: {type: String, required: true},
    address: {type: String, required: true},
  })

export default mongoose.model<IMapPlaces>('MapPlaces', MapPlacesSchema)

