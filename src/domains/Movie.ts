import { MovieInfo } from "../../types/movieType.js";
import MovieItem from "../components/MovieItem.js";

class Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;

  constructor({ id, poster_path, title, vote_average }: MovieInfo) {
    this.id = id;
    this.poster_path = poster_path;
    this.title = title;
    this.vote_average = vote_average;
  }

  movieRender() {
    return MovieItem({
      title: this.title,
      poster_path: this.poster_path,
      vote_average: this.vote_average,
    });
  }
}

export default Movie;
