import {NextFunction, Request, Response} from "express";
import * as passport from "passport";
import {JWT_SECRET} from "../constants";
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import '../config/passport'
import {User} from "../models/User";
import jwtService from "../services/jwt.service";

export class AuthenticationController {

  hello(req: Request, res: Response, next: NextFunction) {
    res.send("hello");
  }

  loginSuccess(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.status(401).send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          const body = {id: user._id}
          const token = jwt.sign(body, JWT_SECRET)
          res.json({
            userId: user._id,
            token: token
          });
        });
      }
    })(req, res, next);
  }

  register(req: Request, res: Response) {
    User.findOne({username: req.body.username}, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  }

  async meUser(req: Request, res: Response) {
    try {
      const user = await jwtService.verify(req);
      const {_doc: {password, ...rest}}: any = user
      res.json({user: {...rest}})
    } catch (e) {
      res.status(401).send(e.message)
    }
  }

}
