import { eventBus, APP_EVENTS } from "./pubsub/EventBus";
import { Header } from "./features/UI/Header";
import { movieListInstance } from "./features/UI/MovieList";
import { updateMoreButton } from "./utils/dom";
import { state } from "./state";

function attachLogoListener() {
  const logo = document.querySelector(".logo") as HTMLElement | null;
  if (!logo) return;
  logo.addEventListener("click", () => {
    eventBus.publish(APP_EVENTS.LOGO_CLICK, undefined);
  }, { once: true });
}

export function setupSubscriptions(
  moreButton: HTMLButtonElement,
  mainTitle: HTMLElement,
): void {
  eventBus.subscribe(APP_EVENTS.TITLE_CHANGED, (title) => {
    mainTitle.textContent = title;
  });

  eventBus.subscribe(APP_EVENTS.LOAD_START, () => {
    movieListInstance.renderSkeleton();
  });

  eventBus.subscribe(APP_EVENTS.MOVIES_LOADED, (data) => {
    Header.clearHeader();
    Header.render(data.results[0] ?? null);
    attachLogoListener();
    movieListInstance.clearList();
    movieListInstance.renderMovieList(data);
    updateMoreButton(moreButton, data.total_pages, state.page);
  });

  eventBus.subscribe(APP_EVENTS.SEARCH_LOADED, (data) => {
    Header.clearHeader();
    Header.renderSearch();
    attachLogoListener();
    if (data.results.length === 0) {
      movieListInstance.clearList();
      movieListInstance.showEmpty();
    } else {
      movieListInstance.clearList();
      movieListInstance.renderMovieList(data);
    }
    updateMoreButton(moreButton, data.total_pages, state.page);
  });

  eventBus.subscribe(APP_EVENTS.MORE_LOADED, (data) => {
    movieListInstance.renderMovieList(data);
    updateMoreButton(moreButton, data.total_pages, state.page);
  });
}
