import "./style.css";

import CUSTOM_EVENT from "../../constants/event";
import createElement from "../../utils/createElement";
import createSearchBox from "../SearchBox/createSearchBox";
import logo from "./logo.png";

const handleClickLogo = () => {
  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT.showPopularMovie, {
      bubbles: true,
    })
  );
};

const createHeader = () => {
  const header = createElement("header");

  const h1 = createElement("h1");

  h1.addEventListener("click", handleClickLogo);

  const img = createElement("img", {
    src: logo,
    alt: "MovieList 로고",
  });
  h1.append(img);

  const searchBox = createSearchBox(CUSTOM_EVENT.searchMovie, "검색");

  header.append(h1, searchBox);

  return header;
};

export default createHeader;
