import Store from './Store';

import Header from './components/Header';
import ListTitle from './components/ListTitle';
import ItemList from './components/ItemList';
import MoreButton from './components/MoreButton';
import WholeScreenMessageAlert from './components/WholeScreenMessageAlert';

class App {
  $main = document.createElement('main');
  $itemView = document.createElement('section');

  constructor($target) {
    new Header($target);
    Store.getPopularMovies();

    this.$itemView.className = 'item-view';

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
          target[props] = value;

          switch (props) {
            case 'nextPage':
              value === -1 ? this.moreButton.hide() : this.moreButton.show();
              break;

            case 'category':
              if (value === 'popular') target['query'] = '';

              this.listTitle.render(this.$itemView);
              break;

            case 'results':
              this.itemList.render(this.$itemView);
              this.moreButton.render(this.$itemView);
              break;

            case 'error':
              const { isError, message } = value;

              if (isError === false) break;

              this.$itemView.innerHTML = WholeScreenMessageAlert(message);
              break;
            default:
          }

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
