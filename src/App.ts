import Header from './components/Header';
import ListTitle from './components/ListTitle';
import MovieList from './components/MovieList';
import { Skeleton } from './components/Skeleton';
import MovieDetail from './components/MovieDetail';
import RemoteControl from './components/RemoteControl';
import stateRender from './renderer/StateRender';

class App {
  private $main = document.createElement('main');
  private $itemView = document.createElement('section');

  private listTitle: ListTitle;
  private movieList: MovieList;
  private skeleton: Skeleton;
  private movieDetail: MovieDetail;

  constructor($target: HTMLElement) {
    new Header($target);
    new RemoteControl().render($target);
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
}

export default App;
