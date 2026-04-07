import { MovieResponse } from "../../../types/types";
import { readMoreMovies, readPopularMovies, readSearchMovies } from "./dataHandlers";
import { eventBus } from "../../pubsub/EventBus";
import { APP_EVENTS } from "../../pubsub/AppEvents";
import { state } from "../../state";

export async function handleInitial(): Promise<void> {
  await loadPopular(state.page);
}

export async function handleLogo(): Promise<void> {
  state.page = 1;
  state.searchQuery = "";
  await loadPopular(state.page);
}

export async function loadPopular(page: number): Promise<void> {
  eventBus.publish(APP_EVENTS.TITLE_CHANGED, "지금 인기 있는 영화");
  eventBus.publish(APP_EVENTS.LOAD_START, undefined);
  try {
    const data: MovieResponse = await readPopularMovies(page);
    eventBus.publish(APP_EVENTS.MOVIES_LOADED, data);
  } catch (error) {
    eventBus.publish(APP_EVENTS.ERROR, (error as Error).message);
  }
}

export async function loadSearch(
  page: number,
  searchMovie: string,
): Promise<void> {
  eventBus.publish(APP_EVENTS.TITLE_CHANGED, `"${searchMovie}" 검색 결과`);
  eventBus.publish(APP_EVENTS.LOAD_START, undefined);
  try {
    const data: MovieResponse = await readSearchMovies(page, searchMovie);
    eventBus.publish(APP_EVENTS.SEARCH_LOADED, data);
  } catch (error) {
    eventBus.publish(APP_EVENTS.ERROR, (error as Error).message);
  }
}

export async function loadMore(
  page: number,
  searchMovie: string,
): Promise<void> {
  try {
    const data: MovieResponse = await readMoreMovies(page, searchMovie);
    eventBus.publish(APP_EVENTS.MORE_LOADED, data);
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

export async function handleMore(): Promise<void> {
  state.page += 1;
  await loadMore(state.page, state.searchQuery);
}
