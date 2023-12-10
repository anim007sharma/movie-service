import "dotenv/config";
import connectDB from "../connection";
import Movie, { IMovie } from "../../models/movie.model";
import CommonUtils from "../../utils/common.utils";
import { moviesList } from "./db_movie";
import User, { IUser } from "../../models/user.model";
import bcrypt from 'bcryptjs';

connectDB();

const importData = async () => {
  try {
    await Movie.deleteMany();
    await User.deleteMany();
    const movies: IMovie[] = [];
    for (let i = 0; i < moviesList.movies.length; i++) {
      const movie: IMovie = {
        id: CommonUtils.uuid("mov_"),
        title: moviesList.movies[i].title,
        genres:moviesList.movies[i].genres,
        year: parseInt(moviesList.movies[i].year),
        director: moviesList.movies[i].director, 
        actors: moviesList.movies[i].actors.split(", ")
      };
      movies.push(movie);
    }

    await Movie.insertMany(movies);

    const user = [{
      name: "Admin",
      email: "admin@movie.com",
      password: bcrypt.hashSync('password', 10),
      isAdmin: true
    }]
    await User.insertMany(user);

    console.log("Movie data seeded!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Movie.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
