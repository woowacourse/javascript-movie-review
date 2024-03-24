/* API Responses Json Key에 대한 예외처리로, 다음규칙을 비활성화 한다. */
/* eslint-disable camelcase */

import MovieItem from '../components/movie-list-section/MovieItem';
import TmdbAPI from '../services/TmdbAPI';
import { $, appendChildren } from '../utils/domUtils';

class MovieListController {
  /* 생성자에서 updatePath() 호출하므로, 단언표현 사용 */
  private path!: string;

  /* 사용 전에 반드시 초기화되므로, 단언표현 사용 (popular, search, more) */
  private params!: UrlParams;

  constructor() {
    /* Default 영화 리스트 */
    this.popular();
  }

  /* 가장 인기 있는 영화 */
  public popular() {
    this.initializeParams();
    this.updatePath(TmdbAPI.PATH.movie.popular);
    this.fetchAndRenderMovies();
  }

  /* 영화 검색 */
  public search(query: string) {
    this.initializeParams({ query });
    this.updatePath(TmdbAPI.PATH.search.movie);
    this.fetchAndRenderMovies();
  }

  /* 더 보기 */
  public more() {
    this.increasePage();
    this.fetchAndRenderMovies();
  }

  private async fetchAndRenderMovies() {
    const { results, total_pages } = await TmdbAPI.fetch({ path: this.path, params: this.params });
    this.hideButtonWhenLastPage(total_pages);
    this.renderMovieItems(results);
  }

  private hideButtonWhenLastPage(total_pages: number) {
    if (Number(this.params.page) === total_pages) {
      $('.item-view button')!.setAttribute('disabled', 'disabled');
    }
  }

  private renderMovieItems(results: Movie[]) {
    const $movieList = $('.item-list')!;
    appendChildren(
      $movieList,
      results.map(({ poster_path: posterPath, title, vote_average: voteAverage }) =>
        MovieItem({ posterPath, title, voteAverage })
      )
    );
  }

  private updatePath(path: string) {
    this.path = path;
  }

  private initializeParams({ page, query }: UrlParams = { page: '1' }) {
    this.params = {
      page,
      query
    };
  }

  private increasePage() {
    this.params.page = String(Number(this.params.page) + 1);
  }
}

export default MovieListController;
