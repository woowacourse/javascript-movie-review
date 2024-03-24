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
    query: undefined
  };

  public static async loadMovieList({ path, query }: Omit<TmdbUrlParams, 'page'>) {
    this.initializeParams({ path, page: '1', query });
    this.hideMoreButton();
    this.clearMovieList();
    await this.fetchAndRenderMovies();
  }

  public static async moreLoadMovieList() {
    this.increasePage();
    this.hideMoreButton();
    await this.fetchAndRenderMovies();
  }

  private static async fetchAndRenderMovies() {
    const { results, total_pages, total_results, status_code } = await TmdbAPI.fetch(this.state);

    if (status_code) this.printErrorMessage(status_code);
    else if (!total_results) this.printMovieNotFoundMessage();
    else {
      this.renderMovieItems(results);
      this.showMoreButtonWhenNotLastPage(total_pages);
    }
  }

  private static clearMovieList() {
    const $movieList = $('.item-list')!;
    while ($movieList.firstChild) {
      $movieList.removeChild($movieList.firstChild);
    }
  }

  private static hideMoreButton() {
    DomController.hideMoreButton();
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

  private static printErrorMessage(status_code: number) {
    DomController.printErrorMessage(status_code);
  }

  private static printMovieNotFoundMessage() {
    DomController.printMovieNotFoundMessage(this.state.query);
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
