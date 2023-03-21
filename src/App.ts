import { Store } from './Store';

import Header from './components/Header';
import ListTitle from './components/ListTitle';
import MovieList from './components/MovieList';
import MoreButton from './components/MoreButton';
import WholeScreenMessageAlert from './components/WholeScreenMessageAlert';
import Movie, { initialMovieStats } from './domain/Movie';
import { Skeleton } from './components/Skeleton';

class App {
  $main = document.createElement('main');
  $itemView = document.createElement('section');

  listTitle: ListTitle;
  movieList: MovieList;
  moreButton: MoreButton;
  skeleton: Skeleton;

  constructor($target: HTMLElement) {
    this.setStoreMovieState();

    new Header($target);

    this.$itemView.className = 'item-view';

    this.listTitle = new ListTitle();
    this.skeleton = new Skeleton(this.$itemView);
    this.movieList = new MovieList();
    this.moreButton = new MoreButton();

    this.initialRender();

    this.$main.insertAdjacentElement('beforeend', this.$itemView);
    $target.insertAdjacentElement('beforeend', this.$main);
  }

  setStoreMovieState() {
    const movieStateProxy = new Proxy<any>(initialMovieStats, {
      set: (target, props, value) => {
        if (props === 'query' && target['query'] !== value) this.skeletonRenderAndClearMovieList();

        target[props] = value;

        switch (props) {
          case 'nextPage': {
            value === -1 ? this.moreButton.hide() : this.moreButton.show();
            break;
          }

          case 'category': {
            if (!this.listTitle) break;

            this.listTitle.render(this.$itemView);
            break;
          }

          case 'results': {
            this.movieListRender();
            break;
          }

          case 'error': {
            this.apiErrorRender(value);
            break;
          }
          default:
        }

        return true;
      },
    });

    Store.set('movieStates', new Movie(movieStateProxy));
  }

  initialRender() {
    this.listTitle.render(this.$itemView);
    this.skeleton.attachSkeleton();
    Store.get('movieStates')?.renderPopularMovies();
  }

  skeletonRenderAndClearMovieList() {
    this.skeleton.attachSkeleton();
    this.movieList.removeCurentCategory();
  }

  movieListRender() {
    if (!this.movieList || !this.moreButton) return;

    this.skeleton.removeSkeleton();
    this.movieList.render(this.$itemView);
    this.moreButton.render(this.$itemView);
  }

  apiErrorRender(value: any) {
    if (!value.length) return;

    this.$itemView.innerHTML = '';
    this.$itemView.insertAdjacentElement('beforeend', WholeScreenMessageAlert(value));
  }
}

export default App;
