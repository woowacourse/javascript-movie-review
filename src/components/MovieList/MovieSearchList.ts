import MovieList from './abstract/MovieList';

export default class MovieSearchList extends MovieList {
  constructor($target: HTMLElement) {
    super($target);
  }

  getCurrentPage(page: 'popularPage' | 'searchPage') {
    return this.state.getValue(page);
  }

  searchFirstQuery(query: string) {
    if (this.state.getValue('query') !== query) {
      this.state.setValue('searchPage', 1);
      this.state.setValue('query', query);
    }
  }

  async getSearchMovies(query: string) {
    if (!this.state.getValue('isSearched')) return;

    this.searchFirstQuery(query);

    this.state.setValue('isLoading', true);
    this.state.setValue('movies', []);
    this.state.emit();

    const movieData = await this.getMoviesData(
      'search/movie',
      'searchPage',
      query
    );

    const currentPage = this.getCurrentPage('searchPage');

    this.state.setValue('movies', movieData.movieList);
    this.state.setValue('isEnd', movieData.total_page === currentPage);
    this.state.setValue('searchPage', currentPage + 1);
    this.state.setValue('isLoading', false);
    this.state.emit();

    return this;
  }

  emit(query: string) {
    this.getSearchMovies(query);
  }
}
