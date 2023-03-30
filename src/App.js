import Movie from './domain/Movie';

import { Header, MovieView, MovieDetail } from './components';

import store from './utils/localStorage';

import { CUSTOM_EVENT, LOCAL_STORAGE_KEY } from './constants';

const pageCounter = (firstPage) => {
  let page = firstPage;
  return () => (page += 1);
};

class App {
  $main = document.createElement('main');

  movie;

  movieView;
  movieDetail;

  reviewScore;

  page = pageCounter(0);
  query = null;
  isLoading = false;

  constructor($target) {
    this.init($target);

    this.render($target);

    this.bindEvent();
  }

  init($target) {
    this.movie = new Movie();

    new Header($target);
    this.movieView = new MovieView(this.$main);
    this.movieDetail = new MovieDetail($target);

    this.reviewScore = store.getLocalStorage(LOCAL_STORAGE_KEY.APP) || {};

    this.updateMovieView();
  }

  render($target) {
    $target.insertAdjacentElement('beforeend', this.$main);
  }

  bindEvent() {
    document.addEventListener(CUSTOM_EVENT.RENDER_MOVIES, ({ detail: { query } }) => {
      this.query = query;
      this.page = pageCounter(0);

      this.updateMovieView();
    });

    document.addEventListener(CUSTOM_EVENT.RENDER_MORE_MOVIES, () => {
      this.updateMovieView();
    });

    document.addEventListener(CUSTOM_EVENT.SHOW_MOVIE_DETAIL, async ({ detail: { id } }) => {
      const { data, isError } = await this.movie.getMovieById(id);
      if (isError) return;

      const reviewScore = this.reviewScore[data.id] || 0;

      this.movieDetail.open({ ...data, reviewScore });
    });

    document.addEventListener(
      CUSTOM_EVENT.UPDATE_REVIEW_SCORE,
      ({ detail: { movieId, score } }) => {
        this.reviewScore[movieId] = score;

        store.setLocalStorage(LOCAL_STORAGE_KEY.APP, this.reviewScore);
      }
    );
  }

  async updateMovieView() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.movieView.showSkeleton();

    const { isError, data } = await this.movie.getMovies(this.query, this.page());
    if (!isError) {
      document.dispatchEvent(
        new CustomEvent(CUSTOM_EVENT.UPDATE_MOVIE_LIST_TITLE, { detail: { query: this.query } })
      );
      this.movieView.addMovies(data);
    }

    this.movieView.hideSkeleton();
    this.isLoading = false;
  }
}

export default App;
