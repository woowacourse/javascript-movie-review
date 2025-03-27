import Button from "./components/Button";
import "./event/movieEventHandler";
import { renderMoviesList } from "./features/movies/movieListRenderer";

if (document.readyState === "complete") {
  setupUI();
} else {
  window.addEventListener("load", setupUI);
}

function setupUI() {
  const $container = document.querySelector(".container");

  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  renderMoviesList();
}
