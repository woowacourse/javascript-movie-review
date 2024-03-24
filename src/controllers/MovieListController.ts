/* API Responses Json Key에 대한 예외처리로, 다음규칙을 비활성화 한다. */
/* eslint-disable camelcase */

import MovieItem from '../components/movie-list-section/MovieItem';
import TmdbAPI from '../services/TmdbAPI';
import { $, appendChildren } from '../utils/domUtils';
import DomController from './DomController';

class MovieListController {
  private static state: TmdbUrlParams = {
    path: '',
    page: '1',
    query: ''
  };

  /* 가장 인기 있는 영화 */
  public static popular() {
    this.hideMoreButton();
    this.initializeParams({ path: TmdbAPI.PATH.movie.popular, page: '1' });
    this.clearMovieList();
    this.fetchAndRenderMovies();
  }

  /* 영화 검색 */
  public static search(query: string) {
    this.hideMoreButton();
    this.initializeParams({ path: TmdbAPI.PATH.search.movie, page: '1', query });
    this.clearMovieList();
    this.fetchAndRenderMovies();
  }

  /* 더 보기 */
  public static more() {
    this.hideMoreButton();
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
    this.renderMovieItems(results);
    this.showMoreButtonWhenNotLastPage(total_pages);
  }

  private static hideMoreButton() {
    DomController.hiddenMoreButton();
  }

  private static showMoreButtonWhenNotLastPage(total_pages: number) {
    if (total_pages > Number(this.state.page)) {
      DomController.showMoreButton();
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
