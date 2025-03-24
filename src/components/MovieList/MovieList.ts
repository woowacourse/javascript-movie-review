import { MovieItemProps } from "../../../types/domain";
import fetchPopularMovies from "../../api/fetchPopularMovies";
import MovieItem from "../MovieItem";
import { movieListContainer } from "./Element";

const MovieList = {
  async init() {
    try {
      const popularMovies = await fetchPopularMovies();

      const movieList = popularMovies?.results.map(
        ({ id, poster_path, vote_average, title }) => {
          return { id, posterPath: poster_path, rate: vote_average, title };
        }
      );
      if (movieList) this.set(movieList);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  },

  set(movieList: MovieItemProps[]) {
    movieList
      .map((movieItem) => MovieItem.create(movieItem))
      .forEach((movieItem) => movieListContainer.appendChild(movieItem));
  },
};

export default MovieList;
