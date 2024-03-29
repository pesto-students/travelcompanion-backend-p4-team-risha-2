import {AuthenticationController} from "../controllers/authentication.controller";
import {PreferencesController} from "../controllers/prefernces.controller";
import {MapPlacesController} from "../controllers/mapPlaces.controller";
import {Application} from "express";
import {FeedController} from "../controllers/feed.controller";
import { LikeController } from "../controllers/like.controller";
export class RouterRoutes {
  authenticationController: AuthenticationController = new AuthenticationController();
  preferencesController: PreferencesController = new PreferencesController();
  mapPlacesController: MapPlacesController = new MapPlacesController();
  feedController: FeedController = new FeedController();
  likeController: LikeController = new LikeController();

  routes(app: Application) {
    app.route("/").get(this.authenticationController.hello);

    // authentication
    app.post("/login/", this.authenticationController.loginSuccess);
    app.post("/register/", this.authenticationController.register);
    app.get("/users",this.authenticationController.allUsers)

    // user
    app.get("/me/", this.authenticationController.meUser);
    app.get("/preferences", this.preferencesController.getPrefernces)
    app.get("/preferences/:login_id", this.preferencesController.getPreferncesByID)
    app.post("/preferences", this.preferencesController.postPrefernces);
    app.post("/preferences/:login_id", this.preferencesController.patchPrefernces);

    // search
    app.get("/mapPlacesbySearch/:location", this.preferencesController.getPreferncesBylocation);
    app.post("/mapPlaces", this.mapPlacesController.postmapPlaces);

    // feed
    app.get("/feed", this.feedController.getFeed);
    app.post("/feed", this.feedController.postFeed);
    app.get("/feed/:id", this.feedController.getFeedById);
    app.delete("/feed/:id", this.feedController.deleteFeed);
    app.put("/feed/:id", this.feedController.updateFeed);
    //like
    app.post("/:postId/likes", this.likeController.postLike);
    app.get("/:postId/likes", this.likeController.getLike);
    app.delete("/:postId/likes", this.likeController.deleteLike);
  }

}
