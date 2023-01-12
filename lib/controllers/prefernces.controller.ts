import { Request, Response } from "express";

//get the handle of schema by importing
import Prefernces from '../models/Prefernces';

export class PreferencesController {
    async getPrefernces(req: Request, res: Response) {
        const prefernce = await Prefernces.find()
        res.json(prefernce)
    }

    async postPrefernces(req: Request, res: Response) {
        console.log(req.body)
           
        const prefernce = new Prefernces({
            "name": req.body.name,
            "email": req.body.email,
            "phone": req.body.phone,
            "Iam": req.body.Iam,
            "location": req.body.location,
            "gender": req.body.gender,
            // intrest:""
        })

        //save to db 
        try {
            const p1 = await prefernce.save();
            res.json(p1)
        } catch (err) {
            res.send('Error')
        }
    }

    async getPreferncesByID(req: Request, res: Response) {
        const prefernce = await Prefernces.findById(req.params.id);
        res.json(prefernce)
    }

    async deletePreferences(req: Request, res: Response) {
        const prefernce = await Prefernces.findById(req.params.id);
        prefernce.name = req.body.name;
        const p1 = await prefernce.remove();
        res.json(p1)
    }

    async patchPrefernces(req: Request, res: Response) {
        const prefernce = await Prefernces.findById(req.params.id);
        prefernce.name = req.body.name;
        const p1 = await prefernce.save();
        res.json(p1)
    }
}
