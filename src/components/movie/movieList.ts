import movieItem from "./movieItem";
import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import { $ } from "../utils/selectors";
import { Movie } from "./types";

const movieList = (movies: Movie[]) => {
  const $movieList = createElementWithAttributes({
    tag: "ul",
    className: "thumbnail-list",
    children: movies.map((movie) => movieItem(movie)),
  });

  const $container = $(".movie-list");
  if ($container instanceof Element === false) {
    return;
  }

  $container.append($movieList);
};

export default movieList;
