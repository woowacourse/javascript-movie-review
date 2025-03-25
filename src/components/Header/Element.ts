import { $ } from "../../utils/querySelectors";

export const $overlay = $<HTMLDivElement>(".overlay");
export const $rate = $<HTMLSpanElement>(".rate-value");
export const $headerTitle = $<HTMLDivElement>(".top-rated-movie .title");

export const $logo = $<HTMLImageElement>(".logo > img");
export const $searchInput = $<HTMLInputElement>(".search-bar");
export const $searchButton = $<HTMLImageElement>("img#search");
