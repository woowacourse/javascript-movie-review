/* eslint-disable max-lines-per-function */
import noImg from "../../templates/no_image.svg";
import { IMAGE_URL } from "../config";
import { createElementWithAttribute } from "../utils";

const POSTER_SIZE = "w500";

function SkeletonImg(className: string) {
  const $skeletonImg = createElementWithAttribute("div", {
    class: `${className} skeleton`,
  });
  return $skeletonImg;
}

const imgSrc = (path: string | null) =>
  path === null ? noImg : IMAGE_URL + POSTER_SIZE + path;

const MovieImg = (posterPath: string, title: string, className: string) => {
  const skeletonUI = SkeletonImg(className);

  const imgElement = createElementWithAttribute("img", {
    class: className,
    src: imgSrc(posterPath),
    alt: title,
    style: "display: none;",
  }) as HTMLImageElement;

  imgElement.addEventListener("load", () => {
    console.log("img load");
    skeletonUI.style.display = "none";
    imgElement.style.display = "block";
  });

  const container = document.createElement("div");
  container.appendChild(skeletonUI);
  container.appendChild(imgElement);
  return container;
};

export default MovieImg;
