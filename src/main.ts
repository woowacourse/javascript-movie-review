import type { AppElements } from "../types/dom";
import { getAppElements } from "./utils/AppElementUtil";
import { notifyEmptyQuery, notifyError } from "./utils/NotifyUtil";
import { renderHeroMovie } from "./utils/RenderUtil";
import { TmdbClient } from "./api/TmdbClient";
import { MovieListStore } from "./movie-list/MovieListStore";
import { MovieListView } from "./movie-list/MovieListView";

const tmdb = new TmdbClient(import.meta.env.VITE_TMDB_API_KEY);
const movieListStore = new MovieListStore(tmdb);

const syncHeroSection = (elements: AppElements) => {
  const shouldShowHero = movieListStore.query === "" && movieListStore.movies.length > 0;

  elements.heroSection.hidden = !shouldShowHero;
  elements.siteHeader.classList.toggle("site-header--overlay", shouldShowHero);

  if (!shouldShowHero) {
    return;
  }

  renderHeroMovie(movieListStore.movies[0], elements);
};

const loadAndRenderMovies = async (
  movieListView: MovieListView,
  kind: "popular" | "search" | "more",
  query?: string,
) => {
  movieListView.showSkeleton();

  try {
    if (kind === "popular") await movieListStore.loadPopular();
    else if (kind === "search") await movieListStore.search(query!);
    else await movieListStore.loadNextPage();

    movieListView.renderMovies(movieListStore.movies);
    movieListView.toggleSeeMore(movieListStore.hasMore);
    movieListView.toggleNoResult(movieListStore.query !== "" && movieListStore.movies.length === 0);
  } catch (error) {
    notifyError(error);
  } finally {
    movieListView.hideSkeleton();
  }
};

const initializeMoviePage = async (elements: AppElements, movieListView: MovieListView) => {
  await loadAndRenderMovies(movieListView, "popular");
  syncHeroSection(elements);
};

const main = async () => {
  const elements = getAppElements();

  const movieListView = new MovieListView({
    listElement: elements.movieList,
    skeletonElement: elements.skeletonCard,
    seeMoreButton: elements.seeMoreBtn,
    sectionTitle: elements.movieSectionTitle,
    noResult: elements.noResult,
  });

  bindEvents(elements, movieListView);

  await initializeMoviePage(elements, movieListView);
};

window.addEventListener("load", () => {
  void main().catch((error) => notifyError(error));
});

const bindEvents = (elements: AppElements, movieListView: MovieListView) => {
  elements.seeMoreBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    await loadAndRenderMovies(movieListView, "more");
  });

  elements.searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = elements.searchInput.value.trim();

    if (!query) {
      notifyEmptyQuery();
      elements.searchInput.focus();
      return;
    }

    await loadAndRenderMovies(movieListView, "search", query);
    syncHeroSection(elements);
  });
};
