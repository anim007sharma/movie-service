import mongoose, { Schema } from "mongoose";

export interface IMovie {
  id: string;
  title: string;
  genres: string[];
  year: number;
  director: string, 
  actors: string[]
}

const movieSchema = new Schema<IMovie>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: false },
  genres: [{ type: String, required: true, unique: false }],
  year: { type: Number, required: true, unique: false },
  director: { type: String, required: true, unique: false },
  actors: [{ type: String, required: true, unique: false }],
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
