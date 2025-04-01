import { MovieInfo } from "../../../types/movieType.ts";
import Movie from "./Movie.ts";

class MovieList {
  movieList: Movie[];
  constructor(movies: MovieInfo[]) {
    this.movieList = movies.map(
      ({ id, poster_path, title, vote_average }) =>
        new Movie({ id, poster_path, title, vote_average })
    );
  }

  renderMovieList() {
    return this.movieList.map((movieInstance) => movieInstance.movieRender());
  }
}

export default MovieList;
