import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

const MovieTitle = (movie: Movie) => {
  const $title = createElementWithAttribute("p", { class: "movie-title" });
  $title.textContent = movie.title;

  return $title;
};

export default MovieTitle;
