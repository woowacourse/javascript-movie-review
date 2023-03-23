import { cache } from '../../utils/cache';
import MovieList from './abstract/MovieList';

export default class MoviePopularList extends MovieList {
  constructor($target: HTMLElement) {
    super($target);
  }

  getCurrentPage(page: 'popularPage' | 'searchPage') {
    return this.state.getValue(page);
  }

  async getPopularMovies() {
    if (this.state.getValue('isSearched')) return;

    cache.popularPage.add(this.state.getValue('popularPage'));

    this.state.setValue('isLoading', true);
    this.state.setValue('movies', []);
    this.state.emit();

    const movieData = await this.getMoviesData('movie/popular', 'popularPage');
    const currentPage = this.getCurrentPage('popularPage');

    this.state.setValue('movies', movieData.movieList);
    this.state.setValue('isEnd', movieData.total_page === currentPage);
    this.state.setValue('popularPage', currentPage + 1);
    this.state.setValue('isLoading', false);
    this.state.emit();
  }

  emit() {
    this.getPopularMovies();
  }
}
