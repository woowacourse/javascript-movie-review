import { eventBus } from "./pubsub/EventBus";
import { APP_EVENTS } from "./pubsub/AppEvents";
import { Header } from "./features/ui/Header";
import { movieListView } from "./features/ui/MovieList";
import { ScrollObserver } from "./features/ui/ScrollObserver";
import { mainTitle, sentinel } from "./dom";

export function registerSubscriptions(): void {
  const scrollObserver = new ScrollObserver(sentinel);
  eventBus.subscribe(APP_EVENTS.TITLE_CHANGED, (title : string) => {
    mainTitle.textContent = title;
  });

  eventBus.subscribe(APP_EVENTS.LOAD_START, () => {
    scrollObserver.disconnect();
    movieListView.renderSkeleton();
  });

  eventBus.subscribe(APP_EVENTS.MOVIES_LOADED, (data ) => {
    Header.clearHeader();
    Header.render(data.results[0] ?? null);
    movieListView.clearList();
    movieListView.renderMovieList(data);
    scrollObserver.observe();
  });

  eventBus.subscribe(APP_EVENTS.SEARCH_LOADED, (data) => {
    Header.clearHeader();
    Header.renderSearch();
    if (data.results.length === 0) {
      movieListView.clearList();
      movieListView.showEmpty();
    } else {
      movieListView.clearList();
      movieListView.renderMovieList(data);
      scrollObserver.observe();
    }
  });

  eventBus.subscribe(APP_EVENTS.MORE_LOADED, (data) => {
    movieListView.renderMovieList(data);
    scrollObserver.observe();
  });

  eventBus.subscribe(APP_EVENTS.LAST_PAGE_REACHED, () => {
    scrollObserver.disconnect();
  });

  eventBus.subscribe(APP_EVENTS.ERROR, (message) => {
    scrollObserver.disconnect();
    movieListView.clearList();
    movieListView.showError(message);
  });
}
