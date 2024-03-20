import "./style.css";

import CUSTOM_EVENT from "../../constants/event";
import TMDBResponse from "../../types/TMDBResponse";
import createElement from "../../utils/createElement";
import createSearchBox from "../SearchBox/createSearchBox";
import { fetchTargetMovie } from "../../apis/fetchMovie";
import logo from "./logo.png";

const createHeader = () => {
  const header = createElement("header");

  const h1 = createElement("h1");
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
