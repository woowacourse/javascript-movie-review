import MovieList from './MovieList';
import MovieListTitle from './MovieListTitle';

class MovieView {
  $itemView = document.createElement('section');

  movieListTitle;

  movieList;

  constructor($target) {
    this.init();

    this.render($target);
  }

  init() {
    this.$itemView.classList = 'item-view';

    this.movieListTitle = new MovieListTitle(this.$itemView);
    this.movieList = new MovieList(this.$itemView);
  }

  render($target) {
    $target.insertAdjacentElement('afterbegin', this.$itemView);
  }

  appearSkeleton() {
    this.movieList.appearSkeleton();
  }

  hideSkeleton() {
    this.movieList.hideSkeleton();
  }

  addMovies({ page, results: movies, total_pages }) {
    if (page === total_pages) {
      // TODO Scroll 이벤트 비활성화
    }

    if (page === 1) {
      this.movieList.switchMovies(movies);

      return;
    }

    this.movieList.insertMovies(movies);
  }
}

export default MovieView;
