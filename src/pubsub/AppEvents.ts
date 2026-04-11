import { MovieDetail, MovieResponse } from "../../types/types";

export type AppEventPayloads = {
  loadStart: void;
  moviesLoaded: MovieResponse;
  searchLoaded: MovieResponse;
  moreLoaded: MovieResponse;
  titleChanged: string;
  logoClick: void;
  error: string;
  loadMore: void;
  lastPageReached: void;
  movieSelected: number;
  movieDetailLoaded: MovieDetail;
};

export const APP_EVENTS = {
  LOAD_START: "loadStart",
  MOVIES_LOADED: "moviesLoaded",
  SEARCH_LOADED: "searchLoaded",
  MORE_LOADED: "moreLoaded",
  TITLE_CHANGED: "titleChanged",
  LOGO_CLICK: "logoClick",
  ERROR: "error",
  LOAD_MORE: "loadMore",
  LAST_PAGE_REACHED: "lastPageReached",
  MOVIE_SELECTED: "movieSelected",
  MOVIE_DETAIL_LOADED: "movieDetailLoaded",
} as const satisfies Record<string, keyof AppEventPayloads>;
