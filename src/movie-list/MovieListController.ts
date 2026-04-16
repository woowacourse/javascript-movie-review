import { TmdbClient } from "../api/TmdbClient";
import { PAGE_TITLE } from "../constants/constant";
import { HeroSection } from "../hero/HeroSection";
import { MovieDetailModal } from "../modal/MovieDetailModal";
import { MovieRatingRepo } from "../rating/MovieRatingRepo";
import { RatingScore } from "../rating/validateScore";
import { MovieListStore } from "./MovieListStore";
import { MovieListView } from "./MovieListView";

export interface Notifier {
  error: (e: unknown) => void;
}

export class MovieListController {
  private _detailToken = 0;

  constructor(
    private readonly store: MovieListStore,
    private readonly view: MovieListView,
    private readonly hero: HeroSection,
    private readonly notifier: Notifier,
    private readonly tmdb: TmdbClient,
    private readonly modal: MovieDetailModal,
    private readonly ratingRepo: MovieRatingRepo,
  ) {}

  async showPopular(): Promise<void> {
    this.view.renderSectionTitle(PAGE_TITLE.POPULAR);
    await this.runWithUi(() => this.store.loadPopular());

    if (this.store.movies[0]) {
      this.hero.update(this.store.movies[0]);
      this.hero.show();
    }
  }

  async search(query: string): Promise<void> {
    this.hero.hide();
    this.view.renderSectionTitle(PAGE_TITLE.SEARCH(query));

    await this.runWithUi(() => this.store.search(query));
  }

  // 더보기 버튼이건 무한스크롤 방식이건 대응 가능
  async loadMore(): Promise<void> {
    await this.runWithUi(() => this.store.loadNextPage());
  }

  async openDetail(movieId: number): Promise<void> {
    const token = ++this._detailToken;
    try {
      const detail = await this.tmdb.fetchMovieDetail(movieId);
      if (token !== this._detailToken) return;
      const currentRating = await this.ratingRepo.getRating(movieId);
      this.modal.open(detail, currentRating);
    } catch (error) {
      if (token !== this._detailToken) return;
      this.notifier.error(error);
    }
  }

  async rateMovie(movieId: number, score: RatingScore): Promise<void> {
    try {
      await this.ratingRepo.saveRating(movieId, score);
    } catch (error) {
      this.notifier.error(error);
    }
  }

  private async runWithUi(action: () => Promise<void>): Promise<void> {
    this.view.showSkeleton();

    try {
      await action();

      this.view.renderMovies(this.store.movies);
      this.view.toggleNoResult(
        this.store.query !== "" && this.store.movies.length === 0,
      );
    } catch (error) {
      this.notifier.error(error);
    } finally {
      this.view.hideSkeleton();
    }
  }
}
