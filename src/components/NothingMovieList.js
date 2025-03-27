import createElement from "./utils/createElement";
import NothingImg from "../../images/으아아.png";

const NOTHING_TEXT = "검색 결과가 없습니다.";

const $fragment = document.createDocumentFragment();

const NothingMovieList = () => {
  const $p = createElement({
    tag: "p",
    classNames: ["nothing-text"],
  });

  const $img = createElement({
    tag: "img",
    src: NothingImg,
    alt: "으아아",
    classNames: ["nothing-img"],
  });

  $p.textContent = NOTHING_TEXT;

  $fragment.appendChild($p);
  $fragment.appendChild($img);

  return $fragment;
};

export default NothingMovieList;
