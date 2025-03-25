import Button from "./components/Button";
import "./features/movies/movieEventHandlers";
import { renderMoviesList } from "./features/movies/movieListRenderer";

addEventListener("load", async () => {
  const $container = document.querySelector(".container");

  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  renderMoviesList();
});
