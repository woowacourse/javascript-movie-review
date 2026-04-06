import { Movie } from "../../types/movie";
import { TmdbClient } from "../api/TmdbClient";

export class MovieListStore {
  private _movies: Movie[] = [];
  private _currentPage = 0;
  private _totalPages = 0;
  private _query = "";
  private _isLoading = false;

  private _requestToken = 0;

  constructor(private readonly client: TmdbClient) {}

  get movies(): readonly Movie[] {
    return this._movies;
  }
  get currentPage(): number {
    return this._currentPage;
  }
  get totalPages(): number {
    return this._totalPages;
  }
  get query(): string {
    return this._query;
  }
  get isLoading(): boolean {
    return this._isLoading;
  }
  get hasMore(): boolean {
    return this._currentPage < this._totalPages;
  }

  async loadPopular(): Promise<void> {
    this.resetState();
    this._query = "";
    await this.loadNextPage();
  }

  /** 검색 (첫 페이지부터). */
  async search(query: string): Promise<void> {
    this.resetState();
    this._query = query;
    await this.loadNextPage();
  }

  /** 더보기 / 무한스크롤 공통 다음 페이지 로더. */
  async loadNextPage(): Promise<void> {
    if (this._isLoading) return;
    if (this._currentPage >= this._totalPages && this._currentPage !== 0) return;

    const myToken = ++this._requestToken;
    this._isLoading = true;

    try {
      const nextPage = this._currentPage + 1;
      const result = this._query
        ? await this.client.searchMovies(this._query, nextPage)
        : await this.client.fetchPopular(nextPage);

      // 내 요청이 더 이상 최신이 아니면 결과를 버린다.
      if (myToken !== this._requestToken) return;

      this._movies = [...this._movies, ...result.results];
      this._currentPage = result.currentPage;
      this._totalPages = result.totalPages;
    } finally {
      // 최신 요청만 로딩 플래그를 내린다.
      if (myToken === this._requestToken) {
        this._isLoading = false;
      }
    }
  }

  private resetState(): void {
    this._movies = [];
    this._currentPage = 0;
    this._totalPages = 0;
    this._isLoading = false;
  }
}
