/* eslint-disable max-lines-per-function */
import noImg from "../../templates/no_image.svg";
import { IMAGE_URL } from "../config";
import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

const POSTER_SIZE = "w500";

function SkeletonImg() {
  const $skeletonImg = createElementWithAttribute("div", {
    class: "item-thumbnail skeleton",
  });
  return $skeletonImg;
}

const imgSrc = (path: string | null) =>
  path === null ? noImg : IMAGE_URL + POSTER_SIZE + path;

const MovieImg = (movie: Movie) => {
  const skeletonUI = SkeletonImg();

  const imgElement = createElementWithAttribute("img", {
    class: "item-thumbnail",
    src: imgSrc(movie.poster_path),
    loading: "lazy",
    alt: movie.title,
    style: "display: none;",
  });

  imgElement.addEventListener("load", () => {
    skeletonUI.style.display = "none";
    imgElement.style.display = "block";
  });

  const container = document.createElement("div");
  container.appendChild(skeletonUI);
  container.appendChild(imgElement);
  return container;
};

export default MovieImg;
