import MovieCard from './MovieCard';
import skeletonTemplate from './Skeleton';
import { FetchType } from '../@types/fetchType';
import { MovieItem } from '../@types/movieType';

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

  createTemplate() {
    this._node = document.createElement('main');
    this.paintMovieLayout();
  }

  createSkeleton() {
    const skeletonListContainer = document.createElement('ul');

    skeletonListContainer.className = 'item-list skeleton-list';
    skeletonListContainer.innerHTML = skeletonTemplate(20);

    this.loadMoreButton.classList.add('hidden');
    this._node.querySelector('.item-view')?.insertAdjacentElement('beforeend', skeletonListContainer);
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
    const skeletonList = this._node.querySelector('.skeleton-list');

    if (!skeletonList) return;

    skeletonList.remove();
  }

  updateMovieList(movieData: MovieItem[], isLastPage: Boolean) {
    this.showEmptyMessage(movieData.length === 0);
    this.removeSkeleton();

    this.movieList.classList.remove('hidden');
    this.loadMoreButton.classList.remove('hidden');

    movieData.forEach(movie => {
      const movieItem = new MovieCard(movie);
      this.movieList.insertAdjacentElement('beforeend', movieItem.node);
    });

    if (isLastPage) this.loadMoreButton.classList.add('hidden');
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
    this.movieList.insertAdjacentHTML(
      'afterend',
      '<div class="empty-message">요청이 불안정합니다. 크론에게 문의해주세요.</div>'
    );
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
    this.deleteEmptyMessage();
  }

  initEventHandler() {
    const button = this._node.querySelector('button');

    if (!button) return;

    button.addEventListener('click', () => {
      this._node.dispatchEvent(new CustomEvent('seeMoreMovie', { bubbles: true }));
    });
  }
}

const movieList = new MovieList();

export default movieList;
