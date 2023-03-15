import { Movie } from '../app';
import MovieItem from './MovieItem';
import skeletonTemplate from './Skeleton';

class MovieList {
  private _node!: HTMLElement;
  private movieList!: HTMLUListElement;
  private loadMoreButton!: HTMLButtonElement;
  private moviesType: string = '지금 인기있는 영화';

  constructor() {
    this.createTemplate();
    this.initEventHandler();

    this.movieList = this._node.querySelector('.movie-list') as HTMLUListElement;
    this.loadMoreButton = this._node.querySelector('.btn') as HTMLButtonElement;
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate(): this {
    this._node = document.createElement('main');
    this.paintMovieLayout();

    return this;
  }

  createSkeleton() {
    const skeletionListContainer = document.createElement('ul');

    skeletionListContainer.className = 'item-list skeleton-list';
    skeletionListContainer.innerHTML = skeletonTemplate(20);

    this.loadMoreButton.classList.add('hidden');
    this._node.querySelector('.item-view')?.insertAdjacentElement('beforeend', skeletionListContainer);
  }

  paintMovieLayout() {
    this._node.innerHTML = `
      <section class="item-view">
        <h2>${this.moviesType}</h2>
        <ul class="item-list movie-list hidden"></ul>
        <button class="btn primary full-width hidden">더 보기</button>
      </section>
    `;
  }

  removeSkeleton() {
    const skeletionList = this._node.querySelector('.skeleton-list');

    if (!skeletionList) return;

    skeletionList.remove();
  }

  updateMovieList(movieData: Movie[]) {
    this.removeSkeleton();

    this.movieList.classList.remove('hidden');
    this.loadMoreButton.classList.remove('hidden');

    movieData.forEach(movie => {
      const moiveItem = new MovieItem(movie);
      this.movieList.insertAdjacentElement('beforeend', moiveItem.node);
    });
  }

  initEventHandler() {
    const button = this._node.querySelector('button');

    if (!button) return;

    button.addEventListener('click', () => {
      this._node.dispatchEvent(new CustomEvent('seeMoreMovie', { bubbles: true }));
    });
  }
}

export default MovieList;
