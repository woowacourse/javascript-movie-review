import movieItem from "./movieItem";
import { createElementWithAttributes } from "../../utils/createElementWithAttributes";
import { Movie } from "../../../domain/types";

const movieList = (movies: Movie[]) => {
  const $movieList = createElementWithAttributes({
    tag: "ul",
    className: "thumbnail-list",
  });

  const $movieItems = movies.map((movie) => movieItem(movie));
  $movieList.append(...$movieItems);

  return $movieList;
};

export default movieList;
