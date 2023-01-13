
import { Request, Response, NextFunction} from "express";
import * as passport from "passport";
import {CLIENT_URL} from "../constants";
export class AuthenticationController {

  hello(req: Request, res: Response, next: NextFunction) {
    res.send("hello");
  }

  loginSuccess(req: Request, res: Response, next: NextFunction) {
    /*if(req.user){
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        // cookies: req.
      });
    }*/
    res.status(200).json({})
  }

  loginFailed(req: Request, res: Response, next: NextFunction) {
    res.status(401).json({
      success: false,
      message: "failure",
    });
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
