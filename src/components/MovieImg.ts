import noImg from "../../templates/no_image.svg";
import { IMAGE_URL } from "../config";
import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

const POSTER_STIZE = "w500";

const imgSrc = (path: string | null) =>
  path === null ? noImg : IMAGE_URL + POSTER_STIZE + path;

const MovieImg = (movie: Movie) =>
  createElementWithAttribute("img", {
    class: "item-thumbnail",
    src: imgSrc(movie.poster_path),
    loading: "lazy",
    alt: movie.title,
  });
export default MovieImg;
