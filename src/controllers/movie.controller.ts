import { Request, Response } from "express";
import MovieService from "../service/movie.service";

class MovieController {
  private movieService: MovieService;
  constructor(){
    this.movieService = new MovieService();
  }

  public search = async (req: Request, res: Response) => {
    const title = req.query.title as string;
    const genre = req.query.genre as string;
    const response = await this.movieService.search(title, genre)
    return res.json(response)
  }

  public getAll = async (_req: Request, res: Response) => {
    const response = await this.movieService.getAll()
    return res.json(response)
  }

  public create = async (req: Request, res: Response) => {
    const body = req.body;
    const response = await this.movieService.create(body)
    return res.json(response)
  }

  public update = async (req: Request, res: Response) => {
    const body = req.body;
    const id = req.body.id;
    const response = await this.movieService.update(id, body)
    return res.json(response)
  }

  public delete = async (req: Request, res: Response) => {
    const id = req.body.id;
    await this.movieService.delete(id)
    return res.status(200).json({ message: 'Movies successfully deleted' });
  }
}

export default MovieController