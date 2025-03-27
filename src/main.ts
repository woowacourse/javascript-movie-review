import { initializeLayout } from "./domains/renderMoviesList";
import "./events/eventDelegator";
import "./events/eventHandlers";

addEventListener("load", () => {
  initializeLayout();
});
