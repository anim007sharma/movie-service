import CommonUtils from "../utils/common.utils";
import Movie from "../models/movie.model";

export class MovieRepository {
  async fetchAllMovies() {
    return Movie.find();
  }

  async getMovieById(id: number) {
    const query = { id: id };
    return Movie.findOne(query);
  }

  async searchMovie(title: string, genre: string) {
    let titleQuery;
    let genreQuery;
    if(title) {
      titleQuery = { title: new RegExp(title, 'i') }
    }
    if(genre) {
      genreQuery = { genres: genre }
    }
    const query = {
      $or: [] as any,
    };
    if(genreQuery) {
      query.$or.push(genreQuery)
    }
    if(titleQuery) {
      query.$or.push(titleQuery)
    }
    return Movie.find(query);
  }

  async createMovie(attributes) {
    const movieDocument = {
      id: CommonUtils.uuid("mov_"),
      title: attributes.title,
      genres: attributes.genre,
      year: attributes.year,
      director: attributes.director,
      actors: attributes.actors,
    };
    Movie.create(movieDocument);
  }

  async updateMovie(id: string, attributes) {
    const movieDocument = {
      title: attributes.title,
      genres: attributes.genre,
      year: attributes.year,
      director: attributes.director,
      actors: attributes.actors,
    };
    return Movie.findOneAndUpdate({ id: id }, movieDocument);
  }

  async deleteMovie(id: string) {
    Movie.deleteOne({ id: id });
  }
}
