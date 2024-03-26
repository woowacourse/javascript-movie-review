/* eslint-disable max-lines-per-function */
import noImg from "../../templates/no_image.svg";
import { IMAGE_URL } from "../config";
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

const MovieImg = (posterPath: string, title: string, className: string) => {
  const skeletonUI = SkeletonImg();

  const imgElement = createElementWithAttribute("img", {
    class: className, //"item-thumbnail",
    src: imgSrc(posterPath),
    loading: "lazy",
    alt: title,
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
