import "./style.css";

import createElement from "../../utils/createElement";
import logo from "./logo.png";

const createHeader = () => {
  const header = createElement("header");

  const h1 = createElement("h1");
  const img = createElement("img", {
    src: logo,
    alt: "MovieList 로고",
  });
  h1.append(img);

  const div = createElement("div", { class: "search-box" });
  const input = createElement("input", { type: "text", placeholder: "검색" });
  const button = createElement("button", { class: "search-button" });
  div.append(input, button);

  header.append(h1, div);

  return header;
};

export default createHeader;
