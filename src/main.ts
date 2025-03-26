import { initializeLayout, updateMoviesList } from "./domains/renderMoviesList";
import "./events/handlers";

addEventListener("load", async () => {
  initializeLayout();
  await updateMoviesList();
});
