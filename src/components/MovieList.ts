import MovieCard from './MovieCard';
import skeletonTemplate from './Skeleton';
import { FetchType } from '../types/fetchType';
import { MovieItem } from '../types/movieType';

class MovieList {
  private _node!: HTMLElement;
  private movieList!: HTMLUListElement;
  private loadMorePosition!: HTMLDivElement;
  private listName!: HTMLElement;

  constructor() {
    this.createTemplate();
    this.movieList = this._node.querySelector('.movie-list') as HTMLUListElement;
    this.loadMorePosition = this._node.querySelector('.load-more-position') as HTMLDivElement;
    this.listName = this._node.querySelector('#list-name') as HTMLElement;
    this.initEventHandler();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate() {
    this._node = document.createElement('main');
    this.paintMovieLayout();
  }

  createSkeleton() {
    const skeletonListContainer = document.createElement('ul');

    skeletonListContainer.className = 'item-list skeleton-list';
    skeletonListContainer.innerHTML = skeletonTemplate(20);

    this.loadMorePosition.classList.add('hidden');
    this._node.querySelector('.item-view')?.insertAdjacentElement('beforeend', skeletonListContainer);
  }

  paintMovieLayout() {
    this._node.innerHTML = /*html*/ `
      <section class="item-view">
        <h2 id="list-name">지금 인기있는 영화</h2>
        <ul class="item-list movie-list hidden"></ul>
        <div class="load-more-position hidden"></div>
      </section>
    `;
  }

  removeSkeleton() {
    const skeletonList = this._node.querySelector('.skeleton-list');

    if (!skeletonList) return;

    skeletonList.remove();
  }

  updateMovieList(movieData: MovieItem[], isLastPage: Boolean) {
    this.showEmptyMessage(movieData.length === 0);
    this.removeSkeleton();

    this.movieList.classList.remove('hidden');
    this.loadMorePosition.classList.remove('hidden');

    movieData.forEach(movie => {
      const movieItem = new MovieCard(movie);
      this.movieList.insertAdjacentElement('beforeend', movieItem.node);
    });

    if (isLastPage) this.loadMorePosition.classList.add('hidden');
  }

  showEmptyMessage(isEmpty: boolean) {
    if (isEmpty) {
      this.movieList.insertAdjacentHTML('afterend', '<div class="empty-message">검색 결과가 없습니다.</div>');
      return;
    }
  }

  deleteEmptyMessage() {
    const emptyMessage = this._node.querySelector('.empty-message');
    if (emptyMessage) emptyMessage.remove();
  }

  showErrorMessage() {
    this.movieList.insertAdjacentHTML('afterend', '<div class="empty-message">요청이 불안정합니다.</div>');
  }

  setListName(type: FetchType, keyword?: string) {
    if (type === FetchType.Popular) {
      this.listName.innerText = '지금 인기있는 영화';
    } else {
      this.listName.innerText = `"${keyword}" 검색 결과`;
    }
  }

  cleanMovieList() {
    this.movieList.innerHTML = '';
    this.deleteEmptyMessage();
  }

  callback(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this._node.dispatchEvent(new CustomEvent('seeMoreMovie', { bubbles: true }));
      }
    });
  }

  initEventHandler() {
    const observer = new IntersectionObserver(this.callback.bind(this), { threshold: 0 });
    observer.observe(this.loadMorePosition);
  }
}

const movieList = new MovieList();

export default movieList;
