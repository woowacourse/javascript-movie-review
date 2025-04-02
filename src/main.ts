import "./event/movieEventHandler";
import { renderMoviesList } from "./features/movies/movieListRenderer";
import { createObserver } from "./apis/intersectionApi";

setupUI();

function setupUI() {
  document.querySelector(".container")!.innerHTML = `<div id="sentinel"></div>`;

  renderMoviesList();
  createObserver();
}
