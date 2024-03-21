import { $ } from '../util/selector.js';
import createButton from './Button.js';
import { injectMovieDataToItem } from './MovieItem.js';
import { createSkeletonMovieList } from './MovieList.js';

class MovieContainer {
  #movieListContainer;
  #sectionTitle;
  #skeletonList;
  #moreButton;
  #handleMoreButton;

  constructor({ title, handleMoreButton }) {
    this.#movieListContainer = $('ul.item-list');

    this.#sectionTitle = $('.item-view > h2');
    this.#sectionTitle.textContent = title;
    this.#handleMoreButton = handleMoreButton;

    this.#moreButton = createButton({ size: 'full-width', variant: 'primary', name: '더 보기 ', type: 'button' });
    this.toggleMoreButtonVisibility();

    this.#moreButton.addEventListener('click', () => this.initHandleClickMoreButton());

    $('section').append(this.#moreButton);
  }

  pushMoreSkeletonList() {
    const skeletonMovieList = createSkeletonMovieList();

    skeletonMovieList.forEach((skeletonMovie) => {
      this.#movieListContainer.appendChild(skeletonMovie);
    });

    this.#skeletonList = skeletonMovieList;

    this.toggleMoreButtonVisibility();
  }

  createEmptySearchResult() {
    const emptySearchResult = document.createElement('h3');
    emptySearchResult.classList.add('empty-search-result');
    emptySearchResult.textContent = '검색 결과가 없습니다.';
    return emptySearchResult;
  }

  removeSkeleton() {
    this.#skeletonList.forEach((skeleton) => {
      skeleton.remove();
    });
  }

  setEmptySearchResult(listLength) {
    if (listLength !== 0) $('h3.empty-search-result')?.remove();

    if (listLength === 0 && !$('h3.empty-search-result'))
      $('.item-view').insertBefore(this.createEmptySearchResult(), this.#movieListContainer);
  }

  replaceSkeletonListToData({ movieList, hasNextPage }) {
    this.setEmptySearchResult(movieList.length);

    this.#skeletonList.forEach((item, i) => {
      if (i >= movieList.length) return item.remove();

      injectMovieDataToItem({ item, movie: movieList[i].data });
    });

    this.toggleMoreButtonVisibility(hasNextPage);

    this.#skeletonList = [];
  }

  toggleMoreButtonVisibility(hasNextPage) {
    this.#moreButton.style.visibility = hasNextPage ? 'visible' : 'hidden';
  }

  clearMovieList() {
    this.#movieListContainer.replaceChildren();
  }

  async initHandleClickMoreButton() {
    await this.#handleMoreButton();
  }

  setTitle(title) {
    this.#sectionTitle.textContent = title;
  }
}

export default MovieContainer;
