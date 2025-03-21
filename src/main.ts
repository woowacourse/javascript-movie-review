import Button from "./components/Button";
import { renderMoviesList } from "./domains/renderMoviesList";
import "./event/index";
import { $ } from "./utils";

addEventListener("load", async () => {
  const $container = $(".container");

  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  renderMoviesList();
});
