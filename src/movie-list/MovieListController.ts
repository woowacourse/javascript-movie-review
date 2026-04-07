import { PAGE_TITLE } from "../constants/constant";
import { MovieListStore } from "./MovieListStore";
import { MovieListView } from "./MovieListView";

export interface Notifier {
  error: (e: unknown) => void;
}

export class MovieListController {
  constructor(
    private readonly store: MovieListStore,

    private readonly view: MovieListView,

    private readonly notifier: Notifier,
  ) {}

  async showPopular(): Promise<void> {
    this.view.renderSectionTitle(PAGE_TITLE.POPULAR);

    await this.runWithUi(() => this.store.loadPopular());
  }

  async search(query: string): Promise<void> {
    this.view.renderSectionTitle(PAGE_TITLE.SEARCH(query));

    await this.runWithUi(() => this.store.search(query));
  }

  // 더보기 버튼이건 무한스크롤 방식이건 대응 가능
  async loadMore(): Promise<void> {
    await this.runWithUi(() => this.store.loadNextPage());
  }


  private async runWithUi(action: () => Promise<void>): Promise<void> {
    this.view.showSkeleton();

    try {
      await action();

      this.view.renderMovies(this.store.movies);

      this.view.toggleSeeMore(this.store.hasMore);

      this.view.toggleNoResult(this.store.query !== "" && this.store.movies.length === 0);
    } catch (error) {
      this.notifier.error(error);
    } finally {
      this.view.hideSkeleton();
    }
  }
}