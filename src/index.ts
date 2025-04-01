import { initializeLayout } from "./main";
import { initializeEventHandlers } from "./events/EventHandler";
import { initializeDomEventListener } from "./events/EventListener";

addEventListener("load", () => {
  initializeLayout();
  initializeDomEventListener();
  initializeEventHandlers();
});
