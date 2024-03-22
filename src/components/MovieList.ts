import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

import ItemCard from "./MovieItem";
import NoneMovieItem from "./NoneMovieItem";

const MovieList = (movieList: Movie[] | undefined) => {
  const $ul = createElementWithAttribute("ul", {
    class: "movie-list",
  });
  if (movieList && movieList.length > 0) {
    movieList.map((movie) => $ul.appendChild(ItemCard(movie)));
  } else {
    $ul.classList.add("no-movie-list");
    $ul.appendChild(NoneMovieItem());
  }
  return $ul;
};
export default MovieList;
