import './style/reset';
import './style/common';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { getPopularMovies, searchMovies } from './service/movie';
import { Movie } from './service/types';
import { toast } from './components/Toast';

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
      this.onClickLogo.bind(this),
    );
    this.movieList.bindEvent(() => getPopularMovies({ page: Store.page, onError: toast }));

    this.movieList.requestAndRenderMovieCards(() => getPopularMovies({ page: 1, onError: toast }));
  }

  onSubmitSearch(results: Movie[], totalPages: number) {
    Store.page = 1;
    this.movieList.removeMovieCards();

    this.movieList.renderTitle(`"${Store.keyword}" 검색결과`);
    this.movieList.renderMovieCards(results, totalPages);
    this.movieList.bindEvent(() =>
      searchMovies({
        page: Store.page,
        query: Store.keyword,
        onError: toast,
      }),
    );
  }

  async onClickLogo() {
    Store.page = 1;
    this.movieList.removeMovieCards();

    this.movieList.renderTitle(`지금 인기 있는 영화`);

    this.movieList.requestAndRenderMovieCards(() => getPopularMovies({ page: 1 }));

    this.movieList.bindEvent(() =>
      getPopularMovies({
        page: Store.page,
        onError: toast,
      }),
    );
  }
}

const app = new App();
app.init();
