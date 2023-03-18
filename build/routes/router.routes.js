"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterRoutes = void 0;
const authentication_controller_1 = require("../controllers/authentication.controller");
const prefernces_controller_1 = require("../controllers/prefernces.controller");
const mapPlaces_controller_1 = require("../controllers/mapPlaces.controller");
const feed_controller_1 = require("../controllers/feed.controller");
const like_controller_1 = require("../controllers/like.controller");
class RouterRoutes {
    constructor() {
        this.authenticationController = new authentication_controller_1.AuthenticationController();
        this.preferencesController = new prefernces_controller_1.PreferencesController();
        this.mapPlacesController = new mapPlaces_controller_1.MapPlacesController();
        this.feedController = new feed_controller_1.FeedController();
        this.likeController = new like_controller_1.LikeController();
    }
    routes(app) {
        app.route("/").get(this.authenticationController.hello);
        // authentication
        app.post("/login/", this.authenticationController.loginSuccess);
        app.post("/register/", this.authenticationController.register);
        app.get("/users", this.authenticationController.allUsers);
        // user
        app.get("/me/", this.authenticationController.meUser);
        app.get("/preferences", this.preferencesController.getPrefernces);
        app.get("/preferences/:login_id", this.preferencesController.getPreferncesByID);
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
exports.RouterRoutes = RouterRoutes;
