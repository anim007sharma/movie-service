import { MovieRepository } from "../repository/movie.repositroy"

class MovieService {
  private movieRepository: MovieRepository
  constructor(){
    this.movieRepository = new MovieRepository();
  }

  public search = async (title: string, genre: string) => {
    try {
      const response = await this.movieRepository.searchMovie(title, genre)
      return response;
    } catch(e) {
      console.error("Error while querying data")
      throw e
    }
  }

  public getAll = async () => {
    try {
      const response = await this.movieRepository.fetchAllMovies()
      return response;
    } catch(e) {
      console.error("Error while querying data")
      throw e
    }
  }

  public create = async (attributes) => {
    try {
      const response = await this.movieRepository.createMovie(attributes)
      return response;
    } catch(e) {
      console.error("Error while querying data")
      throw e
    }
  }

  public update = async (id: string, attributes) => {
    try {
      const response = await this.movieRepository.updateMovie(id, attributes)
      return response;
    } catch(e) {
      console.error("Error while querying data")
      throw e
    }
  }

  public delete = async (id: string) => {
    try {
      await this.movieRepository.deleteMovie(id)
    } catch(e) {
      console.error("Error while querying data")
      throw e
    }
  }
}

export default MovieService;