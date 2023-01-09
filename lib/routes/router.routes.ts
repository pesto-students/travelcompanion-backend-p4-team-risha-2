import {AuthenticationController} from "../controllers/authentication.controller";
import {Application} from "express";

export class RouterRoutes {
  authenticationController: AuthenticationController = new AuthenticationController();

  routes(app: Application) {
    app.route("/").get(this.authenticationController.hello);
    app.get("/login/success", this.authenticationController.loginSuccess);
    app.get("/login/failed", this.authenticationController.loginFailed);
    app.get("/logout", this.authenticationController.logout);
    app.get("/google", this.authenticationController.passportAuthenticateGoogle);
    app.get("/google/callback", this.authenticationController.googleCallback);
  }

}
