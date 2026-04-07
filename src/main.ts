import { SearchForm } from "./search/SearchForm";
import type { AppElements } from "../types/dom";
import { getAppElements } from "./utils/AppElementUtil";
import { notifyEmptyQuery, notifyError } from "./utils/NotifyUtil";
import { renderHeroMovie } from "./utils/RenderUtil";
import { TmdbClient } from "./api/TmdbClient";
import { MovieListStore } from "./movie-list/MovieListStore";
import { MovieListView } from "./movie-list/MovieListView";
import { MovieListController } from "./movie-list/MovieListController";

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

const main = async () => {
  const elements = getAppElements();

  const movieListView = new MovieListView({
    listElement: elements.movieList,
    skeletonElement: elements.skeletonCard,
    seeMoreButton: elements.seeMoreBtn,
    sectionTitle: elements.movieSectionTitle,
    noResult: elements.noResult,
  });

  const controller = new MovieListController(movieListStore, movieListView, { error: notifyError });

  const searchForm = new SearchForm(
    elements.searchForm,
    elements.searchInput,
    async (query) => {
      await controller.search(query);
      syncHeroSection(elements);
    },
    () => {
      notifyEmptyQuery();
    },
  );

  elements.seeMoreBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    await controller.loadMore();
  });

  // 초기 로드
  await controller.showPopular();
  syncHeroSection(elements);
};

window.addEventListener("load", () => {
  void main().catch((error) => notifyError(error));
});
