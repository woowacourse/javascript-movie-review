import { getElementBySelector, getElementsBySelector } from "../utils/elementGetter";

export const getHeaderElement = () => getElementBySelector("header");

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

export const getTopRatedMovieElement = () =>
  getElementBySelector(".top-rated-movie");

export const getBackgroundContainerElement = () =>
  getElementBySelector(".background-container");

export const getLoadMoreInViewElement = () =>
  getElementBySelector(".load-more-inView");

export const getSearchInputElement = () =>
  getElementBySelector(".search-form input");

export const getBodyElement = () => getElementBySelector("body");

export const getModalBackgroundElement = () =>
  getElementBySelector(".modal-background");

export const getModalSkeletonElement = () =>
  getElementBySelector(".modal-background.skeleton");

export const getMyRatingElements = () =>
  getElementsBySelector(".my-rating__content img");
