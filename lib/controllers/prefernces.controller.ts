import {Request, Response} from "express";
import {Types} from "mongoose";
import {Preferences} from "../models/Prefernces";
import jwtService from "../services/jwt.service";

export class PreferencesController {
  async getPrefernces(req: Request, res: Response) {
    const prefernce = await Preferences.find().populate('user').limit(10)
    res.json(prefernce)
  }

  async postPrefernces(req: Request, res: Response) {
    const user = await jwtService.verify(req);
    
    const prefernce = new Preferences({
      "name": req.body.name,
      "email": req.body.email,
      "phone": req.body.phone,
      "Iam": req.body.Iam,
      "location": req.body.location,
      "gender": req.body.gender,
      user: Types.ObjectId(user._id),
      // this is an array of place ID not the mapPlace id
      travelInterests: req.body.travelInterests
    })
console.log(prefernce)
    //save to db
    try {
      const prefernceData = await prefernce.save();
      res.json(prefernceData)
      console.log(prefernceData)
    } catch (err) {
      res.send(err)
    }
  }

  async getPreferncesByID(req: Request, res: Response) {
    const prefernce = await Preferences.findById(req.params.login_id);
    res.json(prefernce)
  }

  async getPreferncesBylocation(req: Request, res: Response) {
    const prefernce = await Preferences.find({location: req.params.location});
    res.json(prefernce)
  }


  async deletePreferences(req: Request, res: Response) {
    const prefernce = await Preferences.findById(req.params.id);
    prefernce.name = req.body.name;
    const p1 = await prefernce.remove();
    res.json(p1)
  }

  async patchPrefernces(req: Request, res: Response) {
    const prefernce = await Preferences.findById(req.params.id);
    prefernce.name = req.body.name;
    const p1 = await prefernce.save();
    res.json(p1)
  }
}
