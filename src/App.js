import Movie from './domain/Movie';

import { Header, MovieView, MovieDetail } from './components';

import { statusCodeToErrorMessage } from './statusCode';

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
  isError = false;

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
      if (this.isLoading) return;
      if (this.isError) this.removeErrorMessage();

      this.isLoading = true;

      const { data, isError } = await this.movie.getMovieById(id);
      if (isError) {
        this.displayErrorMessage(data);
      }

      const reviewScore = this.reviewScore[data.id] || 0;

      this.movieDetail.open({ ...data, reviewScore });

      this.isLoading = false;
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
    if (this.isError) this.removeErrorMessage();

    this.isLoading = true;
    this.movieView.showSkeleton();

    const { isError, data } = await this.movie.getMovies(this.query, this.page());

    if (isError) {
      this.displayErrorMessage(data);
    } else {
      document.dispatchEvent(
        new CustomEvent(CUSTOM_EVENT.UPDATE_MOVIE_LIST_TITLE, { detail: { query: this.query } })
      );
      this.movieView.addMovies(data);
    }

    this.movieView.hideSkeleton();
    this.isLoading = false;
  }

  displayErrorMessage({ status_code: statusCode }) {
    this.isError = true;
    this.$main.classList.add('hidden');

    this.$main.insertAdjacentHTML('beforebegin', this.getErrorMessageTemplate(statusCode));
  }

  removeErrorMessage() {
    this.isError = false;
    this.$main.classList.remove('hidden');

    document.querySelector('.error-message').remove();
  }

  getErrorMessageTemplate(statusCode) {
    const errorDiv = `<div class="error-message">
      <p>${statusCodeToErrorMessage(statusCode)}</p>
    </div>`;

    return errorDiv;
  }
}

export default App;
