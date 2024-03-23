/* eslint-disable max-lines-per-function */
// import noImg from "../../templates/no_image.svg";
// import { IMAGE_URL } from "../config";
// import { Movie } from "../type/movie";
// import { createElementWithAttribute } from "../utils";

// const POSTER_SIZE = "w500";

// const imgSrc = (path: string | null) =>
//   path === null ? noImg : IMAGE_URL + POSTER_SIZE + path;

// const MovieImg = (movie: Movie) =>
//   createElementWithAttribute("img", {
//     class: "item-thumbnail",
//     src: imgSrc(movie.poster_path),
//     loading: "lazy",
//     alt: movie.title,
//   });
// export default MovieImg;

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
  // 스캘레톤 UI 요소 생성
  const skeletonUI = SkeletonImg();

  // 이미지 요소 생성
  const imgElement = createElementWithAttribute("img", {
    class: "item-thumbnail",
    src: imgSrc(movie.poster_path),
    loading: "lazy",
    alt: movie.title,
    style: "display: none;", // 이미지는 일단 보이지 않도록 설정
  });

  // 이미지 로드 이벤트 핸들러 추가
  imgElement.addEventListener("load", () => {
    // 이미지 로드 후 스캘레톤 UI를 숨기고 이미지를 보여줌
    skeletonUI.style.display = "none";
    imgElement.style.display = "block";
  });

  // 스캘레톤 UI와 이미지를 감싸는 부모 요소 생성
  const container = document.createElement("div");
  container.appendChild(skeletonUI);
  container.appendChild(imgElement);

  return container;
};

export default MovieImg;
