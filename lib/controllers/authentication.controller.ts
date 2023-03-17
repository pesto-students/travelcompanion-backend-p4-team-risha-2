import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../constants";
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import '../config/passport'
import jwtService from "../services/jwt.service";
import { Preferences } from "../models/Prefernces";

export class AuthenticationController {

  hello(req: Request, res: Response, next: NextFunction) {
    res.send("hello");
  }

  loginSuccess(req: Request, res: Response, next: NextFunction) {
    Preferences.findOne({ email: req.body.username }, async (err, user) => {
      if (err) throw err;
      if (!user) res.status(401).send("No User Exists");
      const password = user.password;
      const verify = await bcrypt.compare(req.body.password, password);
      if (verify) {
        const body = { id: user._id }
        const token = jwt.sign(body, JWT_SECRET)
        res.json({
          userId: user._id,
          token: token
        });
      } else {
        res.status(403).send("Invalid Credentials");
      }
    })
  }

  register(req: Request, res: Response) {
    Preferences.findOne({ username: req.body.username }, async (err, doc) => {
      // if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new Preferences({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          name: req.body.username,
          "phone": req.body.phone,
          "Iam": req.body.Iam,
          "location": req.body.location,
          "gender": req.body.gender,
          // // this is an array of place ID not the mapPlace id
          travelInterests: req.body.travelInterests
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  }

  async meUser(req: Request, res: Response) {
    try {
      const user = await jwtService.verify(req);
      const { _doc: { password, ...rest } }: any = user
      res.json({ user: { ...rest } })
    } catch (e) {
      res.status(401).send(e.message)
    }
  }

  async allUsers(req: Request, res: Response) {
    const prefernce = await Preferences.find().populate('user')
    res.json(prefernce)
  }

}
