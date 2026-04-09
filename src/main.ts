import { SearchForm } from "./search/SearchForm";
import { TmdbClient } from "./api/TmdbClient";
import { MovieListStore } from "./movie-list/MovieListStore";
import { MovieListView } from "./movie-list/MovieListView";
import { MovieListController } from "./movie-list/MovieListController";
import { HeroSection } from "./hero/HeroSection";
import { queryAppShell } from "./dom/AppShell";
import { Notifier } from "./notify/Notifier";

const main = async () => {
  const elements = queryAppShell();

  const notifier = new Notifier();

  const tmdb = new TmdbClient(import.meta.env.VITE_TMDB_API_KEY);
  const movieListStore = new MovieListStore(tmdb);

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

  const controller = new MovieListController(movieListStore, movieListView, heroSection, notifier);

  const searchForm = new SearchForm(
    elements.searchForm,
    elements.searchInput,
    async (query) => {
      await controller.search(query);
    },
    () => {
      notifier.warn("검색어를 입력해주세요", "영화 제목을 입력한 뒤 다시 시도해주세요.");
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
  void main().catch((error) => console.error("[bootstrap failed]", error));
});
