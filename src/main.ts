import { SearchForm } from "./search/SearchForm";
import { getAppElements } from "./utils/AppElementUtil";
import { notifyEmptyQuery, notifyError } from "./utils/NotifyUtil";
import { TmdbClient } from "./api/TmdbClient";
import { MovieListStore } from "./movie-list/MovieListStore";
import { MovieListView } from "./movie-list/MovieListView";
import { MovieListController } from "./movie-list/MovieListController";
import { HeroSection } from "./hero/HeroSection";

const tmdb = new TmdbClient(import.meta.env.VITE_TMDB_API_KEY);
const movieListStore = new MovieListStore(tmdb);

const main = async () => {
  const elements = getAppElements();

  const movieListView = new MovieListView({
    listElement: elements.movieList,
    skeletonElement: elements.skeletonCard,
    seeMoreButton: elements.seeMoreBtn,
    sectionTitle: elements.movieSectionTitle,
    noResult: elements.noResult,
  });

  const heroSection = new HeroSection({
    section: elements.heroSection,
    siteHeader: elements.siteHeader,
    backdrop: elements.heroBackdrop,
    title: elements.heroTitle,
    rate: elements.heroRate,
    rateValue: elements.heroRateValue,
  });

  const controller = new MovieListController(movieListStore, movieListView, heroSection, { error: notifyError });

  const searchForm = new SearchForm(
    elements.searchForm,
    elements.searchInput,
    async (query) => {
      await controller.search(query);
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
};

window.addEventListener("load", () => {
  void main().catch((error) => notifyError(error));
});
