import {Movie} from '../app';
import MovieItem from './MovieItem';
import skeletonTemplate from './Skeleton';

class MovieList {
  private _node!: HTMLElement;
  private moviesType: string = '지금 인기있는 영화';

  constructor() {
    this.createTemplate();
    this.initEventHandler();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate(): this {
    this._node = document.createElement('main');
    this.paintMovieLayout();
    this.createSkeleton();

    return this;
  }

  createSkeleton() {
    let listContainer = this._node.querySelector('.skeleton-list');

    if (!listContainer) {
      const button = this._node.querySelector('button');

      if (!button) return;

      listContainer = document.createElement('ul');
      listContainer.className = 'item-list skeleton-list';
      button.insertAdjacentElement('beforebegin', listContainer);
    }

    listContainer.innerHTML = skeletonTemplate(20);
  }

  paintMovieLayout() {
    this._node.innerHTML = `
      <section class="item-view">
        <h2>${this.moviesType}</h2>
        <ul class="item-list skeleton-list"></ul>
        <button class="btn primary full-width hidden">더 보기</button>
      </section>
    `;
  }

  removeSkeleton() {}

  updateMovieList(movieData: Movie[]) {
    this._node.querySelector('.skeleton-list')?.remove();

    let ul = this._node.querySelector('.movie-list');

    if (!ul) {
      ul = document.createElement('ul');
      ul.className = 'item-list movie-list';
    }

    const button = this._node.querySelector('button');
    button?.classList.remove('hidden');

    movieData.forEach(movie => {
      const moiveItem = new MovieItem(movie);
      ul?.insertAdjacentElement('beforeend', moiveItem.node);
    });
    button?.insertAdjacentElement('beforebegin', ul);
  }

  initEventHandler() {
    const button = this._node.querySelector('button');

    if (!button) return;

    button.addEventListener('click', () => {
      this._node.dispatchEvent(new CustomEvent('seeMoreMovie', {bubbles: true}));
    });
  }
}

export default MovieList;
