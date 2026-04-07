import type { AppElements } from "../types/dom";
import { getAppElements } from "./utils/AppElementUtil";
import { notifyEmptyQuery, notifyError } from "./utils/NotifyUtil";
import { renderHeroMovie } from "./utils/RenderUtil";
import { TmdbClient } from "./api/TmdbClient";
import { makeSkeleton, renderMovies } from "./movie-list/movieListRender";
import { MovieListStore } from "./movie-list/MovieListStore";

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

const syncSeeMoreButton = (elements: AppElements) => {
  elements.seeMoreBtn.hidden = !movieListStore.hasMore;
};

const syncNoResultSection = (elements: AppElements) => {
  elements.noResult.hidden = !(movieListStore.query !== "" && movieListStore.movies.length === 0);
};

const loadAndRenderMovies = async (elements: AppElements, kind: "popular" | "search" | "more", query?: string) => {
  makeSkeleton(elements.skeletonCard);

  try {
    if (kind === "popular") await movieListStore.loadPopular();
    else if (kind === "search") await movieListStore.search(query!);
    else await movieListStore.loadNextPage();

    renderMovies([...movieListStore.movies], elements.movieList);
    syncSeeMoreButton(elements);
    syncNoResultSection(elements);
  } catch (error) {
    notifyError(error);
  } finally {
    elements.skeletonCard.innerHTML = "";
  }
};

const initializeMoviePage = async (elements: AppElements) => {
  await loadAndRenderMovies(elements, "popular");
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
    await loadAndRenderMovies(elements, "more");
  });

  elements.searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = elements.searchInput.value.trim();

    if (!query) {
      notifyEmptyQuery();
      elements.searchInput.focus();
      return;
    }

    await loadAndRenderMovies(elements, "search", query);
    syncHeroSection(elements);
  });
};
