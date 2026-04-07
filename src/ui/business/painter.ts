import { Movie } from "../../api";
import { observeHeaderScroll } from "../../observer";
import {
  getBannerElement,
  getMovieListElement,
  getSectionElement,
} from "../domain/movieElement";
import Renderer from "../domain/render";

export const paintError = () => {
  const section = getSectionElement();
  if (section)
    Renderer.renderError(section, "영화 정보를 불러오는 데 실패했습니다.");
};

export const paintInitialLoading = (skeletonCount: number) => {
  const movieList = getMovieListElement();
  if (movieList) Renderer.renderSkeleton(movieList, skeletonCount);
  Renderer.hideLoadMoreButton();
};

export const paintClearBanner = () => {
  Renderer.clearBanner();
};

export const paintMovieBanner = (movie: Movie) => {
  const banner = getBannerElement();
  if (banner) {
    Renderer.renderBanner(banner, movie);
    observeHeaderScroll();
  }
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

export const paintLoadMoreButtonStatus = (hasNextPage: boolean) => {
  if (hasNextPage) Renderer.showLoadMoreButton();
  else Renderer.hideLoadMoreButton();
};
