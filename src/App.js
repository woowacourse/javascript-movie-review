import Movie from './domain/Movie';

import Header from './components/Header';
import MovieView from './components/MovieView';
import MovieDetail from './components/MovieDetail';

const pageCounter = (firstPage) => {
  let page = firstPage;
  return () => (page += 1);
};

class App {
  $main = document.createElement('main');

  movie;

  movieView;
  movieDetail;

  page;
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

    this.page = pageCounter(1);

    this.updateMovieView();
  }

  render($target) {
    $target.insertAdjacentElement('beforeend', this.$main);
  }

  bindEvent() {
    document.addEventListener('renderMovies', ({ detail: { query } }) => {
      this.query = query;
      this.page = pageCounter(0);

      this.updateMovieView();
    });

    document.addEventListener('renderMoreMovies', () => {
      this.updateMovieView();
    });

    document.addEventListener('showMovieDetail', async ({ detail: { id } }) => {
      const { data, isError } = await this.movie.getMovieById(id);
      if (isError) return;

      this.movieDetail.open(data);
    });
  }

  async updateMovieView() {
    this.movieView.showSkeleton();

    const { isError, data } = await this.movie.getMovies(this.query, this.page());
    if (!isError) {
      document.dispatchEvent(
        new CustomEvent('updateMovieListTitle', { detail: { query: this.query } })
      );
      this.movieView.addMovies(data);
    }

    this.movieView.hideSkeleton();
  }
}

export default App;
