import { MovieItemProps } from "../../../types/domain";
import MovieItem from "../MovieItem";
import { $movieListContainer } from "./Element";

const MovieList = {
  init(movieList: MovieItemProps[]) {
    this.set(movieList);
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
