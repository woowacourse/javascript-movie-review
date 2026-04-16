import { SearchForm } from "./search/SearchForm";
import { TmdbClient } from "./api/TmdbClient";
import { MovieListStore } from "./movie-list/MovieListStore";
import { MovieListView } from "./movie-list/MovieListView";
import { MovieListController } from "./movie-list/MovieListController";
import { HeroSection } from "./hero/HeroSection";
import { queryAppShell } from "./dom/AppShell";
import { Notifier } from "./notify/Notifier";
import { LocalStorageRatingRepo } from "./rating/LocalStorageRatingRepo";
import { MovieDetailModal } from "./modal/MovieDetailModal";
import { InfiniteScroll } from "./movie-list/InfiniteScroll";

const main = async () => {
  const elements = queryAppShell();

  const notifier = new Notifier();
  const tmdb = new TmdbClient(import.meta.env.VITE_TMDB_API_KEY);
  const movieListStore = new MovieListStore(tmdb);
  const ratingRepo = new LocalStorageRatingRepo();
  let controller!: MovieListController;

  const modal = new MovieDetailModal(
    {
      background: elements.modalBackground,
      closeButton: elements.closeModal,
      poster: elements.modalPoster,
      title: elements.modalTitle,
      category: elements.modalCategory,
      rateValue: elements.modalRateValue,
      detail: elements.modalDetail,
      myRatingStars: elements.myRatingStars,
      myRatingLabel: elements.myRatingLabel,
    },
    (movieId, score) => controller.rateMovie(movieId, score),
  );

  const movieListView = new MovieListView(
    {
      listElement: elements.movieList,
      skeletonElement: elements.skeletonCard,
      sectionTitle: elements.movieSectionTitle,
      noResult: elements.noResult,
    },
    (movieId) => controller.openDetail(movieId),
  );

  const heroSection = new HeroSection({
    section: elements.heroSection,
    siteHeader: elements.siteHeader,
    backdrop: elements.heroBackdrop,
    title: elements.heroTitle,
    rate: elements.heroRate,
    rateValue: elements.heroRateValue,
  });

  controller = new MovieListController(
    movieListStore,
    movieListView,
    heroSection,
    notifier,
    tmdb,
    modal,
    ratingRepo,
  );

  new SearchForm(
    elements.searchForm,
    elements.searchInput,
    async (query) => {
      await controller.search(query);
      infiniteScroll.observe();
    },
    () => {
      notifier.warn(
        "검색어를 입력해주세요",
        "영화 제목을 입력한 뒤 다시 시도해주세요.",
      );
    },
  );

  const infiniteScroll = new InfiniteScroll(
    elements.scrollSentinel,
    async () => {
      await void controller.loadMore();

      if (!movieListStore.hasMore) {
        infiniteScroll.disconnect();
      }
    },
  );

  // 초기 로드
  await controller.showPopular();
  infiniteScroll.observe();
};

window.addEventListener("load", () => {
  void main().catch((error) => console.error("[bootstrap failed]", error));
});
