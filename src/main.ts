import App from "./components/App";
import { renderMoviesList } from "./domains/renderMoviesList";
import { $ } from "./utils";

addEventListener("load", async () => {
  $("#app")?.appendChild(new App().render());

  renderMoviesList();
});
