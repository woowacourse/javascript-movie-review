import Header from './components/Header';
import MovieDetail from './components/MovieDetail';
import RemoteControl from './components/RemoteControl';
import ItemView from './components/ItemView';

class App {
  private $main = document.createElement('main');

  private itemViw: ItemView;

  constructor($target: HTMLElement) {
    new Header($target);
    new RemoteControl().render($target);
    this.itemViw = new ItemView();
    new MovieDetail();

    this.itemViw.initialsSetting();
    this.itemViw.render(this.$main);
    $target.insertAdjacentElement('beforeend', this.$main);
  }
}

export default App;
