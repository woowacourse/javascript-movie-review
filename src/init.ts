import { eventBus } from "./pubsub/EventBus";
import { APP_EVENTS } from "./pubsub/AppEvents";
import { Header } from "./features/ui/Header";
import { movieListView } from "./features/ui/MovieList";
import { updateMoreButton } from "./utils/dom";
import { state } from "./state";
import { handleLogo } from "./features/handler/controllerHandlers";

function attachLogoListener() {
  const logo = document.querySelector(".logo") as HTMLElement | null;
  if (!logo) return;
  logo.addEventListener("click", () => {
    eventBus.publish(APP_EVENTS.LOGO_CLICK, undefined);
  }, { once: true });
}

export function setupSubscriptions(
  // moreButton: HTMLButtonElement,
  mainTitle: HTMLElement,
): void {
  eventBus.subscribe(APP_EVENTS.LOGO_CLICK, handleLogo);
  
  eventBus.subscribe(APP_EVENTS.TITLE_CHANGED, (title : string) => {
    mainTitle.textContent = title;
  });

  eventBus.subscribe(APP_EVENTS.LOAD_START, () => {
    movieListView.renderSkeleton();
  });

  eventBus.subscribe(APP_EVENTS.MOVIES_LOADED, (data ) => {
    Header.clearHeader();
    Header.render(data.results[0] ?? null);
    attachLogoListener();
    movieListView.clearList();
    movieListView.renderMovieList(data);
    updateMoreButton(data.total_pages, state.page);
  });

  eventBus.subscribe(APP_EVENTS.SEARCH_LOADED, (data) => {
    Header.clearHeader();
    Header.renderSearch();
    attachLogoListener();
    if (data.results.length === 0) {
      movieListView.clearList();
      movieListView.showEmpty();
    } else {
      movieListView.clearList();
      movieListView.renderMovieList(data);
    }
    updateMoreButton(data.total_pages, state.page);
  });

  eventBus.subscribe(APP_EVENTS.MORE_LOADED, (data) => {
    movieListView.renderMovieList(data);
    updateMoreButton(data.total_pages, state.page);
  });

  eventBus.subscribe(APP_EVENTS.ERROR, (message) => {
    movieListView.clearList();
    movieListView.showError(message);
  });
}
