import { Request, Response } from "express";

//get the handle of schema by importing
import Prefernces from '../models/Prefernces';

export class PreferencesController {
    async getPrefernces(req: Request, res: Response) {
        const prefernce = await Prefernces.find()
        res.json(prefernce)
    }

    async postPrefernces(req: Request, res: Response) {
        // console.log(req.body)
           
        const prefernce = new Prefernces({
            "name": req.body.name,
            "email": req.body.email,
            "phone": req.body.phone,
            "Iam": req.body.Iam,
            "location": req.body.location,
            "gender": req.body.gender,
            "login_id":req.body.login_id
            // intrest:""
        })

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
        const prefernce = await Prefernces.findById(req.params.login_id);
        res.json(prefernce)
        // console.log("ss",req.params.login_id)
        // const prefernce = await Prefernces.findOne({[login_id]: req.params.login_id},async (err, doc) => {
        //     console.log(doc,err)
        //     // res.json(doc)
        // });
        // console.log(req.params,Prefernces,prefernce)
        // res.json(prefernce)
    }

    async getPreferncesBylocation(req: Request, res: Response) {
        console.log("p",req.params.location)
        const prefernce = await Prefernces.findOne({location:req.params.location});
        console.log(req.body.location,prefernce)
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
