import { MovieDetail, MovieResponse } from "../../types/types";

export type AppEventPayloads = {
  titleChanged: string;
  logoClick: void;
  loadStart: void;
  loadMore: void;
  lastPageReached: void;
  moviesLoaded: MovieResponse;
  searchLoaded: MovieResponse;
  moreLoaded: MovieResponse;

  // 카드 클릭 → 상세 로드 → 모달 닫힘 사이클
  movieSelected: number;
  movieDetailLoaded: MovieDetail;
  modalClosed: void;

  error: string;
};

export const APP_EVENTS = {
  TITLE_CHANGED: "titleChanged",
  LOGO_CLICK: "logoClick",
  LOAD_START: "loadStart",
  LOAD_MORE: "loadMore",
  LAST_PAGE_REACHED: "lastPageReached",
  MOVIES_LOADED: "moviesLoaded",
  SEARCH_LOADED: "searchLoaded",
  MORE_LOADED: "moreLoaded",

  // 카드 클릭 → 상세 로드 → 모달 닫힘 사이클
  MOVIE_SELECTED: "movieSelected",
  MOVIE_DETAIL_LOADED: "movieDetailLoaded",
  MODAL_CLOSED: "modalClosed",

  ERROR: "error",
} as const satisfies Record<string, keyof AppEventPayloads>;
