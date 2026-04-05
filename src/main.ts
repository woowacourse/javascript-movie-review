import type { AppElements } from "../types/dom";
import type { FetchMoviePageDataResponse } from "./api/apiTypes";
import { PAGE_TITLE } from "./constants/constant";
import type { State } from "../types/state";
import { getAppElements } from "./utils/AppElementUtil";
import { notifyEmptyQuery, notifyError } from "./utils/NotifyUtil";
import { makeSkeleton, renderHeroMovie, renderMovies } from "./utils/RenderUtil";
import { TmdbClient } from "./api/TmdbClient";

const state: State = {
  currentPage: 0,
  totalPage: 0,
  movieList: [],
  query: "",
};

const tmdb = new TmdbClient(import.meta.env.VITE_TMDB_API_KEY);

// 쿼리를 받아서 fetch 함
const fetchMoviePages = async (query: string): Promise<FetchMoviePageDataResponse> => {
  const response: FetchMoviePageDataResponse =
    query !== ""
      ? await tmdb.searchMovies(query, state.currentPage + 1)
      : await tmdb.fetchPopular(state.currentPage + 1);

  return response;
};

const syncHeroSection = (elements: AppElements) => {
  const shouldShowHero = state.query === "" && state.movieList.length > 0;

  elements.heroSection.hidden = !shouldShowHero;
  elements.siteHeader.classList.toggle("site-header--overlay", shouldShowHero);

  if (!shouldShowHero) {
    return;
  }

  renderHeroMovie(state.movieList[0], elements);
};

const syncSeeMoreButton = (elements: AppElements) => {
  const shouldHideSeeMoreButton = state.currentPage >= state.totalPage;

  elements.seeMoreBtn.hidden = shouldHideSeeMoreButton;
};

const syncNoResultSection = (elements: AppElements) => {
  const shouldHideNoResultSection = !(state.query !== "" && state.movieList.length === 0);

  elements.noResult.hidden = shouldHideNoResultSection;
};

const updateMovieState = (newState: State) => {
  state.query = newState.query;
  state.currentPage = newState.currentPage;
  state.totalPage = newState.totalPage;
  state.movieList = newState.movieList;
};

const loadMovies = async (elements: AppElements) => {
  makeSkeleton(elements.skeletonCard);

  const response = await fetchMoviePages(state.query);

  updateMovieState({
    currentPage: response.currentPage,
    totalPage: response.totalPages,
    movieList: [...state.movieList, ...response.results],
    query: state.query,
  });

  if (state.currentPage === 1) {
    elements.movieSectionTitle.innerHTML = state.query ? PAGE_TITLE.SEARCH(state.query) : PAGE_TITLE.POPULAR;
  }
  elements.skeletonCard.innerHTML = "";

  renderMovies(state.movieList, elements.movieList);
  syncSeeMoreButton(elements);
  syncNoResultSection(elements);
};

const initializeMoviePage = async (elements: AppElements) => {
  await loadMovies(elements);
  syncHeroSection(elements);
};

const main = async () => {
  const elements = getAppElements();

  bindEvents(elements);

  await initializeMoviePage(elements);
};

window.addEventListener("load", () => {
  void main().catch((error) => notifyError(error));
});

const bindEvents = (elements: AppElements) => {
  elements.seeMoreBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    await loadMovies(elements);
  });

  elements.searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = elements.searchInput.value.trim();

    if (!query) {
      notifyEmptyQuery();
      elements.searchInput.focus();
      return;
    }

    updateMovieState({
      currentPage: 0,
      totalPage: 0,
      movieList: [],
      query,
    });

    await loadMovies(elements);
    syncHeroSection(elements);
  });
};
