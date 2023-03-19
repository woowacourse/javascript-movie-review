import MovieCard from './MovieCard';
import skeletonTemplate from './Skeleton';
import { FetchType } from '../app';
import { MovieItem } from '../domain/processMovieData';

class MovieList {
  readonly node: HTMLElement;

  private listName!: HTMLParagraphElement;
  private movieList!: HTMLUListElement;
  private skeletonList!: HTMLUListElement;
  private loadMoreButton!: HTMLButtonElement;

  constructor() {
    // section을 부모로
    this.node = document.createElement('section');
    this.node.classList.add('item-view');

    //
    this.composeNode().setElements().addEvents();
  }

  composeNode() {
    this.node.innerHTML = `
      <h2 id="list-name">지금 인기있는 영화</h2>
      <ul class="item-list movie-list hidden"></ul>
      <ul class="item-list skeleton-list hidden">${skeletonTemplate(20)}</ul>
      <button class="btn primary full-width hidden">더 보기</button>`;

    return this;
  }

  setElements(): this {
    const listName = this.node.querySelector<HTMLParagraphElement>('#list-name');
    const movieList = this.node.querySelector<HTMLUListElement>('.movie-list');
    const skeletonList = this.node.querySelector<HTMLUListElement>('.skeleton-list');
    const loadMoreButton = this.node.querySelector<HTMLButtonElement>('.btn');

    if (!(movieList && loadMoreButton && listName && skeletonList)) {
      return this;
    }

    this.movieList = movieList;
    this.loadMoreButton = loadMoreButton;
    this.listName = listName;
    this.skeletonList = skeletonList;

    return this;
  }

  showSkeleton(): this {
    this.skeletonList.classList.remove('hidden');

    return this;
  }

  hideSkeleton(): this {
    this.skeletonList.classList.add('hidden');

    return this;
  }

  showButton() {
    this.loadMoreButton.classList.remove('hidden');

    return this;
  }

  hideButton() {
    this.loadMoreButton.classList.add('hidden');

    return this;
  }

  showMovieList() {
    this.movieList.classList.remove('hidden');

    return this;
  }

  hideMovieList() {
    this.movieList.classList.add('hidden');

    return this;
  }

  updateMovieList(movieDetails: MovieItem[], isLastPage: Boolean): this {
    if (movieDetails.length === 0) {
      this.hideSkeleton().hideButton().showEmptyMessage();
      return this;
    }

    this.hideSkeleton().showMovieList();
    this.movieList.append(this.createMovieCards(movieDetails));

    isLastPage ? this.hideButton() : this.showButton();

    return this;
  }

  createMovieCards(movieDetails: MovieItem[]): DocumentFragment {
    return movieDetails
      .map(movie => new MovieCard(movie))
      .reduce((acc: DocumentFragment, cur) => {
        acc.appendChild(cur.node);
        return acc;
      }, new DocumentFragment());
  }

  showEmptyMessage() {
    this.movieList.insertAdjacentHTML('afterend', '<div class="empty-message">검색 결과가 없습니다.</div>');

    return this;
  }

  deleteEmptyMessage() {
    const emptyMessage = this.node.querySelector('.empty-message');
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

  addEvents() {
    this.loadMoreButton.addEventListener('click', this.#handleClickMoreButton.bind(this));
  }

  #handleClickMoreButton() {
    if (this.loadMoreButton.disabled === true) return;

    this.node.dispatchEvent(new CustomEvent('seeMoreMovie', { bubbles: true }));
    this.loadMoreButton.disabled = true;

    setTimeout(() => {
      this.loadMoreButton.disabled = false;
    }, 2000);
  }
}

const movieList = new MovieList();
export default movieList;
