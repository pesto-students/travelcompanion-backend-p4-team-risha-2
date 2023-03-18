import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import {CLIENT_URL} from "./constants";
import {RouterRoutes} from "./routes/router.routes";
import * as mongoose from 'mongoose'

//db connection
mongoose.connect(
  "mongodb+srv://teasm2-US:RtkltsLh1YZSroUq@cluster0.nymn7fl.mongodb.net/?retryWrites=true&w=majority",
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
    this.app.use(bodyParser.urlencoded({extended: true}))

    // CORS
    this.app.use(cors({
      origin: CLIENT_URL,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    }))

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', CLIENT_URL);
      next();
    });

    // Routes
    this.routes.routes(this.app)
  }
}

export default new App().app;
