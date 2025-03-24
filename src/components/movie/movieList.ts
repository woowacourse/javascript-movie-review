import movieItem from "./movieItem";
import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import { Movie } from "./types";

const movieList = (movies: Movie[]) => {
  const $movieList = createElementWithAttributes({
    tag: "ul",
    className: "thumbnail-list",
    children: movies.map((movie) => movieItem(movie)),
  });

  return $movieList;
};

export default movieList;
