import { Store } from './Store';

import Header from './components/Header';
import ListTitle from './components/ListTitle';
import ItemList from './components/ItemList';
import MoreButton from './components/MoreButton';
import WholeScreenMessageAlert from './components/WholeScreenMessageAlert';
import Movie, { initialMovieStats } from './domain/Movie';

class App {
  $main = document.createElement('main');
  $itemView = document.createElement('section');

  listTitle;
  itemList;
  moreButton;

  constructor($target: HTMLElement) {
    this.setStoreMovieState();

    new Header($target);

    this.$itemView.className = 'item-view';

    this.listTitle = new ListTitle(this.$itemView);
    this.itemList = new ItemList(this.$itemView);
    this.moreButton = new MoreButton(this.$itemView);

    this.$main.insertAdjacentElement('beforeend', this.$itemView);
    $target.insertAdjacentElement('beforeend', this.$main);
  }

  setStoreMovieState() {
    const movieStateProxy = new Proxy<any>(initialMovieStats, {
      get: (target, props) => {
        return target[props];
      },
      set: (target, props, value) => {
        target[props] = value;

        switch (props) {
          case 'nextPage': {
            value === -1 ? this.moreButton.hide() : this.moreButton.show();
            break;
          }

          case 'category': {
            if (!this.listTitle) break;

            if (value === 'popular') target['query'] = '';

            this.listTitle.render(this.$itemView);
            break;
          }

          case 'results': {
            if (!this.itemList || !this.moreButton) break;

            this.itemList?.render(this.$itemView);
            this.moreButton?.render(this.$itemView);
            break;
          }

          case 'error': {
            this.$itemView.innerHTML = WholeScreenMessageAlert(value);
            break;
          }
          default:
        }

        return true;
      },
    });

    Store.set('movieStates', new Movie(movieStateProxy));
    Store.get('movieStates')?.renderPopularMovies();
  }
}

export default App;
