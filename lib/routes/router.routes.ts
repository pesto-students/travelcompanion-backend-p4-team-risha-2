import {AuthenticationController} from "../controllers/authentication.controller";
import {PreferencesController} from "../controllers/prefernces.controller";
import {Application} from "express";

export class RouterRoutes {
  authenticationController: AuthenticationController = new AuthenticationController();
  preferencesController: PreferencesController = new PreferencesController();

  routes(app: Application) {
    app.route("/").get(this.authenticationController.hello);
    app.post("/login/", this.authenticationController.loginSuccess);
    app.post("/register/", this.authenticationController.register);
    app.get("/user/", this.authenticationController.UserDetails);
    app.get("/login/failed", this.authenticationController.loginFailed);
    app.get("/logout", this.authenticationController.logout);
    app.get("/google", this.authenticationController.login);
    app.get("/google/callback", this.authenticationController.googleCallback);
    app.get("/preferences", this.preferencesController.getPrefernces)
    app.get("/preferences/id", this.preferencesController.getPreferncesByID)
    app.post("/preferences", this.preferencesController.postPrefernces)
  }

}
