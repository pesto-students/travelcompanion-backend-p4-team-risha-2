import { Request, Response } from "express";
import MapPlaces from "../models/MapPlaces";

export class MapPlacesController{
    async postmapPlaces(req: Request, res: Response) {
           
        const mapPlaces = new MapPlaces({
            "location": req.body.location,
        })

        //save to db 
        try {
            const mapPlacesData = await mapPlaces.save();
            res.json(mapPlacesData)
        } catch (err) {
            res.send(err)
        }
    }

    async getBuddiesBasedonLocation(req: Request, res: Response) {
        const prefernce = await MapPlaces.findById(req.params.login_id);
        res.json(prefernce)
    }
}