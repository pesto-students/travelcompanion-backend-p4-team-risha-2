import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as cookieSession from 'cookie-session';
import {CLIENT_URL} from "./constants";
import {RouterRoutes} from "./routes/router.routes";
import * as mongoose from 'mongoose'

const url = 'mongodb://localhost/travelCompanion'

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

    // Routes
    this.routes.routes(this.app)

    //db connection
    mongoose.connect(url)
    const con = mongoose.connection

    con.on('open', () => { 
        console.log("connected....")
    })
  }
}

export default new App().app;
