import "express-async-errors";
import express from "express";
import * as http from "http";
import cors from "cors";
import MovieController from "./controllers/movie.controller";
import connectDB from "./db/connection";
import {isAdmin} from "./middlewares/auth.middleware"
import "dotenv/config";
import UserController from "./controllers/user.controller";
import {errorHandler} from "./middlewares/error.middleware";

class Setup {
  private app: express.Application;
  private server: http.Server; 
  private port: string | number;
  private movieController: MovieController;
  private userController: UserController;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app); 
    this.port = process.env.PORT || 8080;
    this.movieController = new MovieController();
    this.userController = new UserController();
    this.initializeMiddleware();
  }

  private initializeMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.routes();
    this.app.use(errorHandler)
  }

  private routes() {
    const baseUrl = "/api/v1";
    this.app.route(`/ping`).get((_request, response) => {
      response.send("Ok");
    });
    this.app.route(`${baseUrl}/movies`).get(this.movieController.getAll);
    this.app.route(`${baseUrl}/movies/search`).get(this.movieController.search);
    this.app.route(`${baseUrl}/movies`).post(this.movieController.create);
    this.app.route(`${baseUrl}/movies/:id`).put([isAdmin], this.movieController.update);
    this.app.route(`${baseUrl}/movies/:id`).delete([isAdmin], this.movieController.delete);
    this.app.route(`${baseUrl}/user/token`).post(this.userController.token);
    this.app.all("*", async () => {
      throw new Error("No route found");
    });
  }

  public listen() {
    this.server.listen(this.port, async () => {
      console.info(`App listening on the port ${this.port}`);
      await connectDB();
    });
  }
}

new Setup().listen()
