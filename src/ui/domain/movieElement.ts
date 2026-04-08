import { getElementBySelector } from "../utils/elementGetter";

export const getMainElement = () => getElementBySelector("main");

export const getMovieListElement = () =>
  getElementBySelector(".thumbnail-list");

export const getLoadMoreButtonElement = () =>
  getElementBySelector(".load-more-button");

export const getBannerElement = () => getElementBySelector(".banner-container");

export const getSearchFormElement = () => getElementBySelector(".search-form");

export const getSectionElement = () => getElementBySelector("section");

export const getSectionHeadingElement = () =>
  getElementBySelector("section > h2");

export const getEmptyResultElement = () =>
  getElementBySelector(".empty-result");
