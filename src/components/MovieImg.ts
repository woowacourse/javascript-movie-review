import noImg from "../../templates/no_image.svg";
import { IMAGE_URL } from "../config";
import { createElementWithAttribute } from "../utils";

const POSTER_SIZE = "w500";

function createSkeletonImg(className: string) {
  const $skeletonImg = createElementWithAttribute("div", {
    class: `${className} skeleton`,
  });
  return $skeletonImg;
}

const imgSrc = (path: string | null) =>
  path === null ? noImg : IMAGE_URL + POSTER_SIZE + path;

function createPosterImg(posterPath: string, title: string, className: string) {
  const $img = createElementWithAttribute("img", {
    class: className,
    src: imgSrc(posterPath),
    alt: title,
    style: "display: none;",
  }) as HTMLImageElement;

  return $img;
}

const MovieImg = (posterPath: string, title: string, className: string) => {
  const skeletonUI = createSkeletonImg(className);

  const imgElement = createPosterImg(posterPath, title, className);

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
