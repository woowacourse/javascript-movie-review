import MovieList from './MovieList';
import MovieListTitle from './MovieListTitle';
import SkeletonCards from './SkeletonCards';

class MovieView {
  $itemView = document.createElement('section');

  movieListTitle;
  movieList;
  skeletonCards;

  constructor($target) {
    this.init();

    this.render($target);

    this.bindEvent();
  }

  init() {
    this.$itemView.classList = 'item-view';

    new MovieListTitle(this.$itemView);
    this.movieList = new MovieList(this.$itemView);
    this.skeletonCards = new SkeletonCards(this.$itemView);
  }

  render($target) {
    $target.insertAdjacentElement('afterbegin', this.$itemView);
  }

  bindEvent() {
    window.addEventListener('scroll', this.onScrollHandler);
  }

  onScrollHandler() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight < Math.round(scrollHeight - scrollTop)) return;

    document.dispatchEvent(new CustomEvent('renderMoreMovies'));
  }

  addMovies({ page, results: movies }) {
    if (page === 1) {
      return this.movieList.switchMovies(movies);
    }

    this.movieList.insertMovies(movies);
  }

  showSkeleton() {
    this.skeletonCards.show();
  }

  hideSkeleton() {
    this.skeletonCards.hide();
  }
}

export default MovieView;
