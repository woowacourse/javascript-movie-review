import { initializeLayout, updateMoviesList } from "./domains/renderMoviesList";
import "./events/eventDelegator";
import "./events/eventHandlers";

addEventListener("load", async () => {
  initializeLayout();
  await updateMoviesList();
});
