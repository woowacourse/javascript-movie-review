import Store from './Store';

import Header from './components/Header';
import ListTitle from './components/ListTitle';
import ItemList from './components/ItemList';
import MoreButton from './components/MoreButton';

class App {
  $main = document.createElement('main');
  $itemView = document.createElement('section');

  constructor($target) {
    this.$itemView.className = 'item-view';
    new Header($target);

    this.listTitle = new ListTitle(this.$itemView);
    this.itemList = new ItemList(this.$itemView);
    this.moreButton = new MoreButton(this.$itemView);

    this.movies = new Proxy(
      { results: [], nextPage: 1, query: '', category: 'popular' },
      {
        get: (target, props) => {
          return target[props];
        },
        set: async (target, props, value) => {
          if (value === 'popular') target['query'] = '';
          if (props === 'nextPage' && value === -1) this.moreButton.hide();
          else if (props === 'nextPage' && value !== -1) this.moreButton.show();

          target[props] = value;

          this.itemList.render(this.itemList.$ul);
          this.listTitle.render(this.listTitle.$h2);

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
