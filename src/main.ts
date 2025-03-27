import Button from "./components/Button";
import "./event/movieEventHandler";
import { renderMoviesList } from "./features/movies/movieListRenderer";

addEventListener("load", async () => {
  const $container = document.querySelector(".container");

  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  renderMoviesList();
});
