import { initializeLayout } from "./domains/renderMoviesList";
import { initializeEventHandlers } from "./events/EventHandlers";
import { initializeDomEventListener } from "./events/EventListener";

addEventListener("load", () => {
  initializeLayout();
  initializeDomEventListener();
  initializeEventHandlers();
});
