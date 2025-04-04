import { compose } from "@zoeykr/function-al";
import { MovieContent } from "../../../types/movieType.ts";
import Movie from "./Movie.ts";

class MovieList {
  movieList: Movie[];
  constructor(movies: MovieContent[]) {
    const createMovie = ({
      id,
      poster_path,
      title,
      vote_average,
    }: MovieContent) => new Movie({ id, poster_path, title, vote_average });

    this.movieList = movies.map(compose(createMovie));
  }

  renderMovieList() {
    return this.movieList.map((movieInstance) => movieInstance.movieRender());
  }
}

export default MovieList;
