import { Request, Response } from "express";

//get the handle of schema by importing
const Prefrerces = require('../models/prefernce')

export class PreferencesController{
    async getPrefernces(req:Request,res:Response){
        const prefernces = await Prefrerces.find();
        res.json(prefernces)
    }

    async getPreferncesByID(req:Request,res:Response){
        const prefernce = await Prefrerces.findById(req.params.id);
        res.json(prefernce)
    }

    async patchPrefernces(req:Request,res:Response){
        const prefernce = await Prefrerces.findById(req.params.id);
        prefernce.name = req.body.name;
        const p1 =  await prefernce.save();
        res.json(p1)
    }

    async deletePreferences(req:Request,res:Response){
        const prefernce = await Prefrerces.findById(req.params.id);
        prefernce.name = req.body.name;
        const p1 =  await prefernce.remove();
        res.json(p1)
    }

    async postPrefernces(req:Request,res:Response){
        const prefernce =  new Prefrerces({
            name:req.body.name,
            email:req.body.email
        })
        const p1 =  await prefernce.save();
        res.json(p1)
    }
}

// //get the router when prefernce page is called
// router.get('/', async (req, res) => {
//     try {
//         const prefernces = await Prefrerces.find();
//         res.json(prefernces)

//     } catch (err) {
//         res.send('Error' + err)
//     }
// })

// //get the only one prefernce data
// router.get('/:id', async (req, res) => {
//     try {
//         const prefernce = await Prefrerces.findById(req.params.id);
//         res.json(prefernce)

//     } catch (err) {
//         res.send('Error' + err)
//     }
// })

// //patch the data
// router.patch('/:id',async(req,res)=>{
//     try{
//         const prefernce = await Prefrerces.findById(req.params.id);
//         prefernce.name = req.body.name;
//         const p1 =  await prefernce.save();
//         res.json(p1)
//     }catch(err){
//         res.send('Error' + err)
//     }
// })

// //remove the data
// router.delete('/:id',async(req,res)=>{
//     try{
//         const prefernce = await Prefrerces.findById(req.params.id);
//         prefernce.name = req.body.name;
//         const p1 =  await prefernce.remove();
//         res.json(p1)
//     }catch(err){
//         res.send('Error' + err)
//     }
// })


// //post request to insert the data to db
// router.post('/', async(req,res) => {
//     //object has all info from client side
//     const prefernce =  new Prefrerces({
//         name:req.body.name,
//         email:req.body.email
//     })

//     //save to db 
//     try{
//        const p1 =  await prefernce.save();
//        res.json(p1)
//     }catch(err){
//         res.send('Error')
//     }
// })

