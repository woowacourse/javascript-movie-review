import MovieItem from './MovieItem';
import skeletonTemplate from './Skeleton';
import { FetchType } from '../app';
import { Movie } from '../domain/processMovieData';

class MovieList {
  private _node!: HTMLElement;
  private movieList!: HTMLUListElement;
  private loadMoreButton!: HTMLButtonElement;
  private listName!: HTMLElement;

  constructor() {
    this.createTemplate();
    this.initEventHandler();

    this.movieList = this._node.querySelector('.movie-list') as HTMLUListElement;
    this.loadMoreButton = this._node.querySelector('.btn') as HTMLButtonElement;
    this.listName = this._node.querySelector('#list-name') as HTMLElement;
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
        <h2 id="list-name">지금 인기있는 영화</h2>
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

  updateMovieList(movieData: Movie[], isLastPage?: Boolean) {
    console.log(movieData);
    this.removeSkeleton();

    this.movieList.classList.remove('hidden');
    this.loadMoreButton.classList.remove('hidden');

    movieData.forEach(movie => {
      const moiveItem = new MovieItem(movie);
      this.movieList.insertAdjacentElement('beforeend', moiveItem.node);
    });

    if (isLastPage) this.loadMoreButton.classList.add('hidden');
  }

  setListName(type: FetchType, keyword?: string) {
    if (type === FetchType.Popular) {
      this.listName.innerText = '지금 인기있는 영화';
    } else {
      this.listName.innerText = `${keyword} 검색 결과`;
    }
  }

  cleanMovieList() {
    this.movieList.innerHTML = '';
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
