import Button from "./components/Button";
import { renderMoviesList } from "./domains/renderMoviesList";
import "./event/movieEventHandlers";

addEventListener("load", async () => {
  const $container = document.querySelector(".container");

  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  renderMoviesList();
});
