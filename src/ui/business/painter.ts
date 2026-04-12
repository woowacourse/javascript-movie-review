import { Movie, MovieDetail } from "../../apis/dtos";
import {
  getBannerElement,
  getBodyElement,
  getEmptyResultElement,
  getModalBackgroundElement,
  getModalSkeletonElement,
  getMovieListElement,
  getSectionElement,
} from "../domain/movieElement";
import Renderer from "../domain/render";
import { clearHTML, removeElement } from "../utils/inner";

// 실제 비즈니스적인 문제를 해결하는 로직이 담겨있습니다.
// 부분적인 ui를 그리는 일련의 로직을 담아서 실제로 사용자단에서 필요한 동작들로 추상화된 레벨입니다.

export const paintError = () => {
  const section = getSectionElement();

  if (section)
    Renderer.renderError(section, "영화 정보를 불러오는 데 실패했습니다.");
};

export const paintInitialLoading = (skeletonCount: number) => {
  const movieList = getMovieListElement();

  if (movieList) Renderer.renderSkeleton(movieList, skeletonCount);
};

export const paintClearBanner = () => {
  const banner = getBannerElement();

  if (banner) clearHTML(banner);
};

export const paintMovieBanner = (movie: Movie) => {
  const banner = getBannerElement();

  if (banner) Renderer.renderBanner(banner, movie);
};

export const paintMovieList = (movies: Movie[]) => {
  const movieList = getMovieListElement();

  if (movieList) {
    Renderer.clearSkeleton(movieList);
    Renderer.renderMovies(movieList, movies);
  }
};

export const paintHomeSectionHeading = () => {
  Renderer.renderSectionHeading();
};

export const paintSearchSectionHeading = (query: string) => {
  Renderer.renderSearchSectionHeading(query);
};

export const paintClearMovies = () => {
  const movieList = getMovieListElement();

  if (movieList) clearHTML(movieList);
};

export const paintEmptyResult = () => {
  Renderer.renderEmptyResult();
};

export const paintClearEmptyResult = () => {
  const emptyResult = getEmptyResultElement();

  if (emptyResult) removeElement(emptyResult);
};

export const paintResetList = () => {
  const banner = getBannerElement();
  const movieList = getMovieListElement();
  const emptyResult = getEmptyResultElement();

  if (banner) clearHTML(banner);
  if (movieList) clearHTML(movieList);
  if (emptyResult) removeElement(emptyResult);
};

export const paintPrepareSearch = (query: string, skeletonCount: number) => {
  paintInitialLoading(skeletonCount);
  paintSearchSectionHeading(query);
};

export const paintInView = () => {
  const section = getSectionElement();

  if (section) Renderer.renderInView(section);
};

export const paintMovieModalSkeleton = () => {
  const body = getBodyElement();

  if (body) Renderer.renderMovieModalSkeleton(body);
};

export const paintRemoveModalSkeleton = () => {
  const skeleton = getModalSkeletonElement();

  if (skeleton) removeElement(skeleton);
};

export const paintMovieModal = (movie: MovieDetail, rating: number) => {
  const body = getBodyElement();

  if (body) Renderer.renderMovieModal(body, movie, rating);
};

export const paintMovieModalError = () => {
  const body = getBodyElement();

  if (body) Renderer.renderMovieModalError(body);
};

export const paintRemoveModal = () => {
  const modal = getModalBackgroundElement();

  if (modal) removeElement(modal);
};
