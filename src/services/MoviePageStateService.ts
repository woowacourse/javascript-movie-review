import type { FetchMoviePageDataResponse } from "../API/api.types";
import { PAGE_TITLE } from "../constants/constant";
import type { AppElements } from "../../types/dom";
import type { Movie } from "../../types/movie";
import type { MovieUserRating } from "../../types/movieRating";
import type { State } from "../../types/state";
import { applyMovieUserRating } from "./MovieRatingService";
import { renderHeroMovie } from "./RenderService";

export const createInitialMoviePageState = (): State => ({
  currentPage: 0,
  totalPage: 0,
  movieList: [],
  query: "",
});

export const createNextMoviePageState = (
  state: State,
  response: FetchMoviePageDataResponse,
  movieList: Movie[],
  query: string,
  shouldReset: boolean,
): State => {
  const previousMovieList = shouldReset ? [] : state.movieList;

  return {
    currentPage: response.currentPage,
    totalPage: response.totalPages,
    movieList: [...previousMovieList, ...movieList],
    query,
  };
};

export const syncMovieSectionTitle = (elements: AppElements, state: State) => {
  if (state.currentPage !== 1) {
    return;
  }

  elements.movieSectionTitle.textContent = state.query ? PAGE_TITLE.SEARCH(state.query) : PAGE_TITLE.POPULAR;
};

export const syncMoviePage = (elements: AppElements, state: State) => {
  const shouldShowHero = state.query === "" && state.movieList.length > 0;

  const shouldHideSentinel = state.movieList.length === 0 || state.currentPage >= state.totalPage;
  const shouldHideNoResultSection = !(state.query !== "" && state.movieList.length === 0);

  elements.heroSection.hidden = !shouldShowHero;
  elements.siteHeader.classList.toggle("site-header--overlay", shouldShowHero);
  elements.infiniteScrollSentinel.hidden = shouldHideSentinel;
  elements.noResult.hidden = shouldHideNoResultSection;

  if (shouldShowHero) {
    renderHeroMovie(state.movieList[0], elements);
  }
};

export const applyMovieUserRatingToMovieList = (movieList: Movie[], movieId: number, userRating: MovieUserRating) => {
  return movieList.map((movie) => {
    if (movie.id !== movieId) {
      return movie;
    }

    return applyMovieUserRating(movie, userRating);
  });
};
