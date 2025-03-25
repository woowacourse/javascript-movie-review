import { MovieItemProps } from "../../../types/domain";
import MovieItem from "../MovieItem";
import { $movieListContainer } from "./Element";

const MovieList = {
  async init(movieList: MovieItemProps[]) {
    try {
      this.set(movieList);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  },

  set(movieList: MovieItemProps[]) {
    $movieListContainer.replaceChildren();
    this.add(movieList);
  },

  add(movieList: MovieItemProps[]) {
    movieList
      .map((movieItem) => MovieItem.create(movieItem))
      .forEach((movieItem) => $movieListContainer.appendChild(movieItem));
  },
};

export default MovieList;
