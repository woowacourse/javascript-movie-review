/* API Responses Json Key에 대한 예외처리로, 다음규칙을 비활성화 한다. */
/* eslint-disable camelcase */

import MovieItem from '../components/movie-list-section/MovieItem';
import TmdbAPI from '../services/TmdbAPI';
import { $, appendChildren } from '../utils/domUtils';

class MovieListController {
  private static state: TmdbUrlParams = {
    path: '',
    page: '1',
    query: ''
  };

  /* 가장 인기 있는 영화 */
  public static popular() {
    this.initializeParams({ path: TmdbAPI.PATH.movie.popular, page: '1' });
    this.clearMovieList();
    this.fetchAndRenderMovies();
  }

  /* 영화 검색 */
  public static search(query: string) {
    this.initializeParams({ path: TmdbAPI.PATH.search.movie, page: '1', query });
    this.clearMovieList();
    this.fetchAndRenderMovies();
  }

  /* 더 보기 */
  public static more() {
    this.increasePage();
    this.fetchAndRenderMovies();
  }

  private static clearMovieList() {
    const $movieList = $('.item-list')!;

    while ($movieList.firstChild) {
      $movieList.removeChild($movieList.firstChild);
    }
  }

  private static async fetchAndRenderMovies() {
    const { results, total_pages } = await TmdbAPI.fetch(this.state);
    this.hideButtonWhenLastPage(total_pages);
    this.renderMovieItems(results);
  }

  private static hideButtonWhenLastPage(total_pages: number) {
    if (Number(this.state.page) === total_pages) {
      $('.item-view button')!.setAttribute('disabled', 'disabled');
    }
  }

  private static renderMovieItems(results: Movie[]) {
    const $movieList = $('.item-list')!;
    appendChildren(
      $movieList,
      results.map(({ poster_path: posterPath, title, vote_average: voteAverage }) =>
        MovieItem({ posterPath, title, voteAverage })
      )
    );
  }

  private static initializeParams({ path, page, query }: TmdbUrlParams) {
    this.state.path = path;
    this.state.page = page;
    this.state.query = query;
  }

  private static increasePage() {
    this.state.page = String(Number(this.state.page) + 1);
  }
}

export default MovieListController;
