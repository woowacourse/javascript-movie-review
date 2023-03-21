import Store from './Store';

import { Header, ListTitle, ItemList, MoreButton, WholeScreenMessageAlert } from './components';

class App {
  $main = document.createElement('main');
  $itemView = document.createElement('section');

  constructor($target) {
    this.$itemView.className = 'item-view';

    new Header($target);
    Store.updatePopularMovies();

    this.listTitle = new ListTitle(this.$itemView);
    this.itemList = new ItemList(this.$itemView);
    this.moreButton = new MoreButton(this.$itemView);

    Store.state = new Proxy(Store.getState(), {
      get: (target, props) => {
        return target[props];
      },

      set: async (target, props, value) => {
        target[props] = value;

        switch (props) {
          case 'nextPage':
            value === -1 ? this.moreButton.hide() : this.moreButton.show();
            break;

          case 'query':
            this.listTitle.render(this.$itemView);
            break;

          case 'movies':
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
    });

    this.$main.insertAdjacentElement('beforeend', this.$itemView);
    $target.insertAdjacentElement('beforeend', this.$main);
  }
}

export default App;
