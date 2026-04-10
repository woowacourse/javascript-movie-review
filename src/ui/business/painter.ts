import { Movie, MovieDetail } from "../../apis/dtos";
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
};

export const paintClearBanner = () => {
  Renderer.clearBanner();
};

export const paintMovieBanner = (movie: Movie) => {
  const banner = getBannerElement();
  if (banner) {
    Renderer.renderBanner(banner, movie);
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

export const paintSearchSectionHeading = (query: string) => {
  Renderer.renderSearchSectionHeading(query);
};

export const paintClearMovies = () => {
  Renderer.clearMovies();
};

export const paintEmptyResult = () => {
  Renderer.renderEmptyResult();
};

export const paintClearEmptyResult = () => {
  Renderer.clearEmptyResult();
};

export const paintResetList = () => {
  Renderer.clearBanner();
  Renderer.clearMovies();
  Renderer.clearEmptyResult();
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
  const body = document.querySelector("body");
  if (body) {
    Renderer.renderMovieModalSkeleton(body);
  }
};

export const paintMovieModal = (movie: MovieDetail) => {
  const body = document.querySelector("body"); // TODO: 계층화 하기
  if (body) {
    Renderer.renderMovieModal(body, movie);
  }
};

export const paintMovieModalError = () => {
  const body = document.querySelector("body");
  if (body) {
    Renderer.renderMovieModalError(body);
  }
};
