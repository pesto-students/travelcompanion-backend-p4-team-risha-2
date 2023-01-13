
import { Request, Response, NextFunction} from "express";
import * as passport from "passport";
import {CLIENT_URL} from "../constants";
import * as bcrypt  from "bcryptjs"
import User from '../models/user'

export class AuthenticationController {

  hello(req: Request, res: Response, next: NextFunction) {
    res.send("hello");
  }

  login = () => passport.authenticate("google",{scope: ["profile"]})

  loginSuccess(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
        console.log(user)
          if (err) throw err;
          res.send("Successfully Authenticated");
          // console.log(req.user);
        });
      }
    })(req, res, next);
  }

  register(req: Request, res: Response){
    User.findOne({ username: req.body.username }, async (err, doc) => {
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

  loginFailed(req: Request, res: Response) {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  }

  UserDetails(req: Request, res: Response){
    res.send(req.user);
  }


  passportAuthenticateGoogle(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate("google",{scope: ["profile"]})
  }

  logout(req: Request, res: Response, next: NextFunction) {
    // req.logout();
    res.redirect(CLIENT_URL);
  }

  googleCallback(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate("google",{
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed"
    })
  }



}
