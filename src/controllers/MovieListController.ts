/* API Responses Json Key에 대한 예외처리로, 다음규칙을 비활성화 한다. */
/* eslint-disable camelcase */

import MovieItem from '../components/movie-list-section/MovieItem';
import TmdbAPI from '../services/TmdbAPI';
import { $ } from '../utils/domUtils';
import DomController from './DomController';
import InfiniteScrollController from './InfiniteScrollController';

class MovieListController {
  private static state: TmdbUrlParams = {
    path: '',
    page: '1',
    query: undefined
  };

  public static async loadMovieList({ path, query }: Omit<TmdbUrlParams, 'page'>) {
    this.initializeParams({ path, page: '1', query });
    this.clearMovieList();
    await this.fetchAndRenderMovies();
  }

  public static async moreLoadMovieList() {
    this.increasePage();
    await this.fetchAndRenderMovies();
  }

  private static async fetchAndRenderMovies() {
    this.showMovieListSkeleton();
    const { results, total_pages, total_results, status_code } = await TmdbAPI.fetch(this.state);
    this.hideMovieListSkeleton();

    if (status_code) this.printErrorMessage(status_code);
    else if (!total_results) this.printMovieNotFoundMessage();
    this.renderMovieItems(results);
    this.setInfiniteScrollWhenNotLastPage(total_pages);
  }

  private static clearMovieList() {
    const $movieList = $('.item-list')!;
    while ($movieList.firstChild) {
      $movieList.removeChild($movieList.firstChild);
    }
  }

  private static hideMovieListSkeleton() {
    DomController.hideMovieListSkeleton();
  }

  private static showMovieListSkeleton() {
    DomController.showMovieListSkeleton();
  }

  private static setInfiniteScrollWhenNotLastPage(total_pages: number) {
    if (total_pages > Number(this.state.page)) {
      InfiniteScrollController.initObserveTarget();
    }
  }

  private static renderMovieItems(movies: Movie[]) {
    const movieItems = movies.map((movie) => {
      const { poster_path: posterPath, id, title, vote_average: voteAverage } = movie;
      return MovieItem({ posterPath, id, title, voteAverage });
    });

    DomController.renderMovieItems(movieItems);
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
