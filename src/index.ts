import './style/reset';
import './style/common';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { getPopularMovies } from './service/movie';
import { Movie } from './service/types';

interface Store {
  keyword: string;
  page: number;
}

export const Store: Store = {
  keyword: '',
  page: 1,
};

class App {
  header;
  movieList;

  constructor() {
    const $app = document.querySelector('#app') as HTMLDivElement;
    this.header = new Header($app);
    this.movieList = new MovieList($app);
  }

  async init() {
    this.header.bindEvent(
      this.movieList.showSkeleton.bind(this.movieList),
      this.movieList.removeSkeleton.bind(this.movieList),
      this.onSubmitSearch.bind(this),
    );
    this.movieList.bindEvent();

    this.movieList.showSkeleton();
    const { results, total_pages } = await getPopularMovies({ page: 1 });
    this.movieList.removeSkeleton();
    this.movieList.renderMovieCards(results, total_pages);
  }

  onSubmitSearch(results: Movie[], totalPages: number) {
    this.movieList.renderMode = 'search';
    this.movieList.removeMovieCards();

    this.movieList.renderTitle(`"${Store.keyword}" 검색결과`);
    this.movieList.renderMovieCards(results, totalPages);
  }
}

const app = new App();
app.init();
