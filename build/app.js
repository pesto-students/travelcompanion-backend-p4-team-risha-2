"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const constants_1 = require("./constants");
const router_routes_1 = require("./routes/router.routes");
const mongoose = require("mongoose");
//db connection
mongoose.connect("mongodb+srv://teasm2-US:RtkltsLh1YZSroUq@cluster0.nymn7fl.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("Mongoose Is Connected");
});
class App {
    constructor() {
        this.routes = new router_routes_1.RouterRoutes();
        this.app = express();
        // Body Parser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // CORS
        this.app.use(cors({
            origin: constants_1.CLIENT_URL,
            methods: "GET,POST,PUT,DELETE",
            credentials: true,
        }));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', constants_1.CLIENT_URL);
            next();
        });
        // Routes
        this.routes.routes(this.app);
    }
}
exports.default = new App().app;
