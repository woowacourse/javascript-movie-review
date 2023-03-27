import MovieList from './abstract/MovieList';

// utils
import { cacheHook } from '../../utils/cache';

export default class MovieSearchList extends MovieList {
  constructor($target: HTMLElement) {
    super($target);
  }

  getCurrentPage(page: 'popularPage' | 'searchPage') {
    return this.state.getValue(page);
  }

  searchFirstQuery(query: string) {
    const { search } = cacheHook;

    if (this.state.getValue('query') === query) return;

    this.state.setValue('searchPage', 1);
    this.state.setValue('query', query);

    search.reset();
  }

  async getSearchMovies(query: string) {
    const { search } = cacheHook;

    if (!this.state.getValue('isSearched')) return;

    this.searchFirstQuery(query);

    search.store(this.state.getValue('searchPage'));

    this.state.setValue('isLoading', true);
    this.state.setValue('movies', []);
    this.state.emit();

    const movieData = await this.getMoviesData(
      'search/movie',
      'searchPage',
      query
    );

    const currentPage = this.getCurrentPage('searchPage');

    if (!movieData) {
      this.state.setValue('isError', true);
      this.state.setValue('isLoading', false);
      this.state.emit();

      this.state.setValue('movies', []);

      return;
    }

    this.state.setValue('isError', false);
    this.state.setValue('movies', movieData.movieList);
    this.state.setValue('isEnd', movieData.total_page === currentPage);
    this.state.setValue('searchPage', currentPage + 1);
    this.state.setValue('isLoading', false);
    this.state.emit();
    this.state.setValue('movies', []);

    return this;
  }

  emit(query: string) {
    this.getSearchMovies(query);
  }
}
