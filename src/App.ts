import Header from './components/Header';
import ListTitle from './components/ListTitle';
import MovieList from './components/MovieList';
import MoreButton from './components/MoreButton';
import { Skeleton } from './components/Skeleton';
import stateRender from './renderer/StateRender';

class App {
  $main = document.createElement('main');
  $itemView = document.createElement('section');

  listTitle: ListTitle;
  movieList: MovieList;
  moreButton: MoreButton;
  skeleton: Skeleton;

  constructor($target: HTMLElement) {
    new Header($target);

    this.$itemView.className = 'item-view';

    this.listTitle = new ListTitle();
    this.skeleton = new Skeleton(this.$itemView);
    this.movieList = new MovieList();
    this.moreButton = new MoreButton();

    stateRender.initialize({
      listTitle: this.listTitle,
      skeleton: this.skeleton,
      movieList: this.movieList,
      moreButton: this.moreButton,
      targetNode: this.$itemView,
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
}

export default App;
