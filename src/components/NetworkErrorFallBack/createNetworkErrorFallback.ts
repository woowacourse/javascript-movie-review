import "./style.css";

import MoviePosterBoard, {
  MoviePosterType,
} from "./../MoviePosterBoard/MoviePosterBoard";

import { $ } from "../../utils/selector";
import ERROR_MEOW_BASE64 from "./ERROR_MEOW_BASE64";
import createButton from "../Button/createButton";
import createElement from "../../utils/createElement";

const handleButtonClick = (posterType: MoviePosterType, movieName?: string) => {
  const moviePosterBoard = new MoviePosterBoard(posterType, movieName);
  $("body>section")?.remove();
  $("body")?.append(moviePosterBoard.element);
};

const createNetworkFallback = (
  posterType: MoviePosterType,
  movieName?: string
) => {
  const section = createElement("section", { class: "network-error-fallback" });

  const img = createElement("img", {
    src: ERROR_MEOW_BASE64,
    alt: "ERROR_MEOW",
    class: "error-meow",
  });

  const mainText = createElement(
    "h2",
    {},
    "오늘부터 인터넷은 내가 지배한다옹~"
  );
  const subText = createElement(
    "h3",
    {},
    "(🙀 고양이가 인터넷 선을 물어뜯지는 않았는지 확인해보세요 🙀)"
  );

  const retryButton = createButton("재시도", () =>
    handleButtonClick(posterType, movieName)
  );
  retryButton.classList.remove("full-width");
  retryButton.classList.add("reconnect-network-btn");

  section.append(img, mainText, subText, retryButton);

  return section;
};

export default createNetworkFallback;
