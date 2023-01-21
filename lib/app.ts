import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as cookieSession from 'cookie-session';
import {CLIENT_URL} from "./constants";
import {RouterRoutes} from "./routes/router.routes";
import * as mongoose from 'mongoose'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import * as passport from "passport";

//db connection
mongoose.connect(
  "no cred",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);


class App {
  app: express.Application;
  routes: RouterRoutes = new RouterRoutes();

  constructor() {
    this.app = express();

    // Body Parser
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    // CORS
    this.app.use(cors({
      origin: CLIENT_URL,
      methods:"GET,POST,PUT,DELETE",
      credentials:true,
    }))

    // Cookie Session
    this.app.use(
      cookieSession({name:"session",keys:["lama"], maxAge: 24*60*60*100 })
    )

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', CLIENT_URL);
      next();
    });

    // Passport
    this.app.use(passport.initialize())
    this.app.use(passport.session())


    // Routes
    this.routes.routes(this.app)

    this.app.use(
      session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
      })
    );

    this.app.use(cookieParser("secretcode"));
    require("./config/passport")(passport);
  }
}

export default new App().app;
