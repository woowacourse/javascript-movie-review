import MovieList from './abstract/MovieList';

import { cacheHook } from '../../utils/cache';

export default class MoviePopularList extends MovieList {
  constructor($target: HTMLElement) {
    super($target);
  }

  getCurrentPage(page: 'popularPage' | 'searchPage') {
    return this.state.getValue(page);
  }

  async getPopularMovies() {
    const { popular } = cacheHook;

    if (this.state.getValue('isSearched')) return;

    popular.store(this.state.getValue('popularPage'));

    this.state.setValue('isLoading', true);
    this.state.emit();

    const movieData = await this.getMoviesData('movie/popular', 'popularPage');
    const currentPage = this.getCurrentPage('popularPage');

    if (!movieData || movieData.movieList.length === 0) {
      this.state.setValue('isError', true);
      this.state.setValue('isLoading', false);
      this.state.emit();

      this.state.setValue('movies', []);

      return;
    }

    this.state.setValue('isError', false);
    this.state.setValue('movies', movieData.movieList);
    this.state.setValue('isEnd', movieData.total_page === currentPage);
    this.state.setValue('popularPage', currentPage + 1);
    this.state.setValue('isLoading', false);
    this.state.emit();
    this.state.setValue('movies', []);

    return this;
  }

  emit() {
    this.getPopularMovies();
  }
}
