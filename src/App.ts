import Header from './components/Header';
import ListTitle from './components/ListTitle';
import MovieList from './components/MovieList';
import Skeleton from './components/Skeleton';
import MovieDetail from './components/MovieDetail';
import RemoteControl from './components/RemoteControl';
import stateRender from './renderer/StateRender';
import ItemView from './components/ItemView';

class App {
  private $main = document.createElement('main');
  private $itemView = document.createElement('section');

  private itemViw: ItemView;
  private movieDetail: MovieDetail;

  constructor($target: HTMLElement) {
    new Header($target);
    new RemoteControl().render($target);
    this.itemViw = new ItemView();

    this.movieDetail = new MovieDetail();

    stateRender.initialize({
      movieDetail: this.movieDetail,
      itemViewSection: this.$itemView,
    });

    this.itemViw.initialsSetting();
    this.itemViw.render(this.$main);
    $target.insertAdjacentElement('beforeend', this.$main);
  }

  // initialRender() {
  //   this.listTitle.render(this.$itemView);
  //   this.skeleton.attachSkeleton();

  //   stateRender.renderPopularMovies();
  // }
}

export default App;
