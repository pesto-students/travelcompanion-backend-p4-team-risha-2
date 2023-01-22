import {Request, Response} from "express";
import MapPlaces from "../models/MapPlaces";
import {Preferences} from "../models/Prefernces";

export class MapPlacesController {
  async postmapPlaces(req: Request, res: Response) {

    const mapPlaces = new MapPlaces({
      "location": req.body.location,
      "placeId": req.body.location.place_id,
      "address": req.body.location.formatted_address,
    })

    //save to db
    try {
      const previousPlaces = await MapPlaces.findOne({placeId: req.body.location.place_id});
      if (!previousPlaces) {
        const mapPlacesData = await mapPlaces.save();
        res.json([])
      }
      const users = await Preferences.find({travelInterests: req.body.location.place_id}).populate('user')
      res.json(users)
    } catch (err) {
      res.send(err)
    }
  }

  async getBuddiesBasedonLocation(req: Request, res: Response) {
    const prefernce = await MapPlaces.findById(req.params.login_id);
    res.json(prefernce)
  }
}
