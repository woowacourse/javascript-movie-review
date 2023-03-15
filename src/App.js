import Store from './Store';

import Header from './components/Header';
import ListTitle from './components/ListTitle';
import ItemList from './components/ItemList';

class App {
  $main = document.createElement('main');
  $itemView = document.createElement('section');

  constructor($target) {
    this.$itemView.className = 'item-view';
    new Header($target);
    this.listTitle = new ListTitle(this.$itemView);
    this.itemList = new ItemList(this.$itemView);

    this.movies = new Proxy(
      { results: [], nextPage: 1, query: '', category: 'popular' },
      {
        get: (target, prop) => {
          return target[prop];
        },
        set: (target, prop, value) => {
          if (value === 'popular') target['query'] = '';
          target[prop] = value;

          this.listTitle.render(this.$itemView);
          this.itemList.render(this.$itemView);
          return true;
        },
      }
    );

    Store.movies = this.movies;

    this.$main.insertAdjacentElement('beforeend', this.$itemView);
    $target.insertAdjacentElement('beforeend', this.$main);
  }
}

export default App;
