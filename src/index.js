import './style/reset';
import './style/common';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { getPopularMovies } from './service/movie';

export const Store = {
  keyword: '',
  page: 1,
};

class App {
  constructor() {
    const $app = document.querySelector('#app');

    this.header = new Header($app);
    this.movieList = new MovieList($app);

    this.init();
  }

  async init() {
    this.header.bindEvent(
      this.movieList.toggleSkeleton.bind(this.movieList),
      this.onSubmitSearch.bind(this),
    );
    this.movieList.bindEvent();

    this.movieList.toggleSkeleton();
    const { results, total_pages } = await getPopularMovies({ page: 1 });
    this.movieList.toggleSkeleton();
    this.movieList.renderMovieCards(results, total_pages);
  }

  onSubmitSearch(results, totalPages) {
    this.movieList.renderMode = 'search';
    this.movieList.page = 1;
    this.movieList.removeMovieCards();

    this.movieList.renderTitle(`"${Store.keyword}" 검색결과`);
    this.movieList.renderMovieCards(results, totalPages);
  }
}

new App();
