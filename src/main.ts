import Button from "./components/Button";
import "./event/movieEventHandler";
import "./event/modalEventHandler";
import "./apis/intersectionApi";
import { renderMoviesList } from "./features/movies/movieListRenderer";
import { createObserver } from "./apis/intersectionApi";
import { toElement } from "./utils/domUtils";

if (document.readyState === "complete") {
  setupUI();
} else {
  window.addEventListener("load", setupUI);
}

function setupUI() {
  const $container = document.querySelector(".container");

  $container?.appendChild(toElement(`<div id="sentinel"></div>`));

  renderMoviesList();
  createObserver();
}
