import createElement from "../utils/createElement";

const NOTHING_IMG_SRC = "./images/으아아.png";
const NOTHING_TEXT = "검색 결과가 없습니다.";

const $fragment = document.createDocumentFragment();

const NothingMovieList = () => {
  const $p = createElement({
    tag: "p",
    classNames: ["nothing-text"],
  });

  const $img = createElement({
    tag: "img",
    src: NOTHING_IMG_SRC,
    alt: "으아아",
    classNames: ["nothing-img"],
  });

  $p.textContent = NOTHING_TEXT;

  $fragment.appendChild($p);
  $fragment.appendChild($img);

  return $fragment;
};

export default NothingMovieList;
