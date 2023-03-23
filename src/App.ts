import Header from './components/Header';
import ListTitle from './components/ListTitle';
import MovieList from './components/MovieList';
import { Skeleton } from './components/Skeleton';
import stateRender from './renderer/StateRender';
import MovieDetail from './components/MovieDetail';

class App {
  $main = document.createElement('main');
  $itemView = document.createElement('section');

  listTitle: ListTitle;
  movieList: MovieList;
  skeleton: Skeleton;
  movieDetail: MovieDetail;

  constructor($target: HTMLElement) {
    new Header($target);

    this.$itemView.className = 'item-view';

    this.listTitle = new ListTitle();
    this.skeleton = new Skeleton(this.$itemView);
    this.movieList = new MovieList();
    this.movieDetail = new MovieDetail();

    stateRender.initialize({
      listTitle: this.listTitle,
      skeleton: this.skeleton,
      movieList: this.movieList,
      movieDetail: this.movieDetail,
      itemViewSection: this.$itemView,
    });

    this.initialRender();

    this.$main.insertAdjacentElement('beforeend', this.$itemView);
    $target.insertAdjacentElement('beforeend', this.$main);
  }

  initialRender() {
    this.listTitle.render(this.$itemView);
    this.skeleton.attachSkeleton();

    stateRender.renderPopularMovies();
  }

  renderMoreInfo() {
    const states = stateRender.getMovieState();
    const { nextPage, category, query } = states;
    if (category === 'popular') {
      stateRender.renderPopularMovies(nextPage);
      return;
    }

    stateRender.renderSearchedMovies(query, nextPage);
  }
}

export default App;
