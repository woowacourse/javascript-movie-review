import { MovieResponse } from "../../types/types";

export type AppEventPayloads = {
  loadStart: void;
  moviesLoaded: MovieResponse;
  searchLoaded: MovieResponse;
  moreLoaded: MovieResponse;
  titleChanged: string;
  logoClick: void;
};

export const APP_EVENTS = {
  LOAD_START: "loadStart",
  MOVIES_LOADED: "moviesLoaded",
  SEARCH_LOADED: "searchLoaded",
  MORE_LOADED: "moreLoaded",
  TITLE_CHANGED: "titleChanged",
  LOGO_CLICK: "logoClick",
} as const satisfies Record<string, keyof AppEventPayloads>;
