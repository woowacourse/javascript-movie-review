// src/handlers/SearchHandler.ts
import MovieListHandler from './MovieListHandler.js';

export default class SearchHandler {
  private currentQuery: string = '';
  private movieListHandler: MovieListHandler;

  constructor(movieListHandler: MovieListHandler) {
    this.movieListHandler = movieListHandler;
  }

  /**
   * 검색 요청을 처리.
   * @param query 검색어
   */
  async handleSearch(query: string): Promise<void> {
    this.currentQuery = query.trim();

    if (!this.currentQuery) {
      await this.movieListHandler.loadMovies();
      return;
    }

    await this.movieListHandler.loadMovies(this.currentQuery);
  }

  /**
   * 추가 검색 결과를 불러온다 (무한 스크롤)
   */
  async loadMoreSearchResults(): Promise<void> {
    await this.movieListHandler.loadMoreMovies(this.currentQuery);
  }

  /**
   * 현재 검색어를 반환한다.
   */
  getCurrentQuery(): string {
    return this.currentQuery;
  }
}
