import { eventBus } from "./pubsub/EventBus";
import { APP_EVENTS } from "./pubsub/AppEvents";
import { handleLogo, handleMore, handleSearch, handleInitial } from "./features/handler/controllerHandlers";
import { submitContainer } from "./dom";

export function setupRoutes(): void {
  eventBus.subscribe(APP_EVENTS.LOAD_MORE, handleMore);

  eventBus.subscribe(APP_EVENTS.LOGO_CLICK, () => {
    eventBus.publish(APP_EVENTS.TITLE_CHANGED, "지금 인기 있는 영화");
    handleLogo();
  });
}

export function bindDomEvents(): void {

  addEventListener("load", async () => {
    eventBus.publish(APP_EVENTS.TITLE_CHANGED, "지금 인기 있는 영화");
    await handleInitial();
  });

  submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    const searchInput = document.querySelector(".search-input") as HTMLInputElement;
    const query = searchInput.value.trim();
    const title = query === "" ? "지금 인기 있는 영화" : `"${query}" 검색 결과`;
    eventBus.publish(APP_EVENTS.TITLE_CHANGED, title);
    await handleSearch(query);
  });
}
