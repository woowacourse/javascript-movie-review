import Header from './components/Header';
import MovieDetail from './components/MovieDetail';
import RemoteControl from './components/RemoteControl';
import stateRender from './renderer/StateRender';
import ItemView from './components/ItemView';

class App {
  private $main = document.createElement('main');
  private $itemView = document.createElement('section');

  private itemViw: ItemView;

  constructor($target: HTMLElement) {
    new Header($target);
    new RemoteControl().render($target);
    this.itemViw = new ItemView();
    new MovieDetail();

    stateRender.initialize({
      itemViewSection: this.$itemView,
    });

    this.itemViw.initialsSetting();
    this.itemViw.render(this.$main);
    $target.insertAdjacentElement('beforeend', this.$main);
  }
}

export default App;
