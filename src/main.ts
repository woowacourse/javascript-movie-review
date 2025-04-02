import "./event/movieEventHandler";
import { renderMoviesList } from "./features/movies/movieListRenderer";
import { createObserver } from "./apis/intersectionApi";
import { toElement } from "./utils/domUtils";

setupUI();

function setupUI() {
  const $container = document.querySelector(".container");

  $container?.appendChild(toElement(`<div id="sentinel"></div>`));

  renderMoviesList();
  createObserver();
}
