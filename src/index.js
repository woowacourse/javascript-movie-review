import './style/reset';
import './style/common';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { getPopularMovies } from './service/movie';
import { RENDER_MODE } from './constants';

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

    const lastItem = document.querySelector('#js-movie-list').lastElementChild;

    const io = new IntersectionObserver(this.handleIntersect.bind(this), { threshold: 0 });
    io.observe(lastItem);
  }

  handleIntersect(entries, io) {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        console.log('무한스크롤');
        io.unobserve(entry.target);
        this.movieList.toggleSkeleton();
        const { results, total_pages, page } = await getPopularMovies({ page: Store.page + 1 });
        Store.page += 1;
        this.movieList.renderMovieCards(results);
        this.movieList.toggleSkeleton();
        io.observe(document.querySelector('#js-movie-list').lastElementChild);
      }
    });
  }

  onSubmitSearch(results, totalPages) {
    this.movieList.renderMode = RENDER_MODE.SEARCH;
    this.movieList.page = 1;
    this.movieList.removeMovieCards();

    this.movieList.renderTitle(`"${Store.keyword}" 검색결과`);
    this.movieList.renderMovieCards(results, totalPages);
  }
}

new App();
