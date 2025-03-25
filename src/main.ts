import { Button } from "./components/index";
import { renderMoviesList } from "./domains/renderMoviesList";
import "./events/index";

addEventListener("load", async () => {
  const $container = document.querySelector(".container");

  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  renderMoviesList();
});
