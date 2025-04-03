import { initializeLayout } from "./main";
import { initializeEventHandler } from "./events/EventHandler";
import { initializeDomEventListener } from "./events/EventListener";

addEventListener("load", () => {
  initializeLayout();
  initializeDomEventListener();
  initializeEventHandler();
});
