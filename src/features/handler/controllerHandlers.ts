import { MovieResponse } from "../../../types/types";
import { handleMoreMovie, handleMovie, handleSearchMovie } from "./dataHandlers";
import { eventBus, APP_EVENTS } from "../../pubsub/EventBus";

export async function initialRender(page: number): Promise<void> {
  eventBus.publish(APP_EVENTS.TITLE_CHANGED, "지금 인기 있는 영화");
  eventBus.publish(APP_EVENTS.LOAD_START, undefined);
  const data: MovieResponse = await handleMovie(page);
  eventBus.publish(APP_EVENTS.MOVIES_LOADED, data);
}

export async function searchRender(
  page: number,
  searchMovie: string,
): Promise<void> {
  eventBus.publish(APP_EVENTS.TITLE_CHANGED, `"${searchMovie}" 검색 결과`);
  eventBus.publish(APP_EVENTS.LOAD_START, undefined);
  const data: MovieResponse = await handleSearchMovie(page, searchMovie);
  eventBus.publish(APP_EVENTS.SEARCH_LOADED, data);
}

export async function moreRender(
  page: number,
  searchMovie: string,
): Promise<void> {
  const data: MovieResponse = await handleMoreMovie(page, searchMovie);
  eventBus.publish(APP_EVENTS.MORE_LOADED, data);
}
