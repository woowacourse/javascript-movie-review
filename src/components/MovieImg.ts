import { IMAGE_URL } from "../config";
import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

const POSTER_STIZE = "w500";

const MovieImg = (movie: Movie) =>
  createElementWithAttribute("img", {
    class: "item-thumbnail",
    src: IMAGE_URL + POSTER_STIZE + movie.poster_path,
    loading: "lazy",
    alt: movie.title,
  });
export default MovieImg;
