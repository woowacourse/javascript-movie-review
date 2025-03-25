import { $ } from "../../utils/querySelectors";

export const $backgroundContainer = $<HTMLDivElement>(".background-container");
export const $overlay = $<HTMLDivElement>(".overlay");
export const $topRatedMovie = $<HTMLDivElement>(".top-rated-movie");
export const $rate = $<HTMLSpanElement>(".rate-value");
export const $headerTitle = $<HTMLDivElement>(".top-rated-movie .title");

export const $logo = $<HTMLImageElement>(".logo > img");
export const $searchInput = $<HTMLInputElement>(".search-bar");
export const $searchButton = $<HTMLImageElement>("img#search");
