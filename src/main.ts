import { initialRender } from "./features/movieController";
import { movieState } from "./features/movieState";
import { initEvents } from "./features/eventHandler";

addEventListener("load", async () => {
  await initialRender(movieState.page);
  initEvents();
});
