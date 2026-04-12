import { MovieDetail, MovieResponse } from "../../../types/types";
import { getMoreMovies, getMovieDetail, getPopularMovies, getSearchMovies } from "./dataHandlers";
import { eventBus } from "../../pubsub/EventBus";
import { APP_EVENTS } from "../../pubsub/AppEvents";
import { state } from "../../state";

export async function loadInitial(): Promise<void> {
  await loadPopular(state.page);
}

export async function resetToPopular(): Promise<void> {
  state.page = 1;
  state.searchQuery = "";
  await loadPopular(state.page);
}

export async function loadPopular(page: number): Promise<void> {
  eventBus.publish(APP_EVENTS.LOAD_START, undefined);
  try {
    const data: MovieResponse = await getPopularMovies(page);
    eventBus.publish(APP_EVENTS.MOVIES_LOADED, data);
  } catch (error) {
    eventBus.publish(APP_EVENTS.ERROR, (error as Error).message);
  }
}

export async function handleSearch(query: string): Promise<void> {
  state.page = 1;
  state.searchQuery = query;
  if (query === "") {
    await loadPopular(state.page);
    return;
  }
  await loadSearch(state.page, query);
}

export async function loadSearch(page: number, query: string): Promise<void> {
  eventBus.publish(APP_EVENTS.LOAD_START, undefined);
  try {
    const data: MovieResponse = await getSearchMovies(page, query);
    eventBus.publish(APP_EVENTS.SEARCH_LOADED, data);
  } catch (error) {
    eventBus.publish(APP_EVENTS.ERROR, (error as Error).message);
  }
}

export async function handleMore(): Promise<void> {
  state.page += 1;
  await loadMore(state.page, state.searchQuery);
}

export async function loadMore(page: number, query: string): Promise<void> {
  try {
    const data: MovieResponse = await getMoreMovies(page, query);
    eventBus.publish(APP_EVENTS.MORE_LOADED, data);
    if (page >= data.total_pages) {
      eventBus.publish(APP_EVENTS.LAST_PAGE_REACHED, undefined);
    }
  } catch (error) {
    eventBus.publish(APP_EVENTS.ERROR, (error as Error).message);
  }
}

export async function loadMovieDetail(movieId: number): Promise<void> {
  try {
    const data: MovieDetail = await getMovieDetail(movieId);
    eventBus.publish(APP_EVENTS.MOVIE_DETAIL_LOADED, data);
  } catch (error) {
    eventBus.publish(APP_EVENTS.ERROR, (error as Error).message);
  }
}
