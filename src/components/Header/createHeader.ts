import "./style.css";

import createElement from "../../utils/createElement";
import createSearchBox from "../SearchBox/createSearchBox";
import logo from "./logo.png";
import MoviePosterController from "../../MoviePosterController";

const goHomepage = () => {
  const input = document.querySelector<HTMLInputElement>("#header__search-box");
  if (input) input.value = "";

  MoviePosterController.renderPopularMoviePosterBoard();
};

const createHeader = () => {
  const header = createElement({ tagName: "header" });

  const h1 = createElement({ tagName: "h1" });
  h1.addEventListener("click", goHomepage);

  const logoImg = createElement({
    tagName: "img",
    attrs: {
      src: logo,
      alt: "MovieList 로고",
    },
  });
  h1.append(logoImg);

  const searchBox = createSearchBox("검색");
  const input = searchBox.querySelector("input");
  if (input) input.id = "header__search-box";

  header.append(h1, searchBox);

  return header;
};

export default createHeader;
