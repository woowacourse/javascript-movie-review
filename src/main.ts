import { initialRender } from "./features/movieController";
import { initEvents } from "./features/eventHandler";

addEventListener("load", async () => {
  await initialRender();
  initEvents();
});
