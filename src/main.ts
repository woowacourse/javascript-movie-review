import Button from "./components/Button";
import Inner from "./components/Inner";
import { renderMoviesList } from "./domains/renderMoviesList";
import { $ } from "./utils";

addEventListener("load", async () => {
  $("#app")?.appendChild(Inner());

  $(".container")?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  renderMoviesList();
});
