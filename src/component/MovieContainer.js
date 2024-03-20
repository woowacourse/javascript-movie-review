import { $ } from '../util/selector.js';
import createButton from './Button.js';
import { createMovieList } from './MovieList.js';

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

    this.pushMoreSkeletonList();
  }

  pushMoreSkeletonList() {
    const skeletonMovieList = createMovieList();

    skeletonMovieList.forEach((skeletonMovie) => {
      this.#movieListContainer.appendChild(skeletonMovie);
    });

    this.#skeletonList = skeletonMovieList;

    this.toggleMoreButtonVisibility();
  }

  replaceSkeletonListToData({ movieList, hasNextPage }) {
    const newMovieList = createMovieList(movieList);

    this.#skeletonList.forEach((skeletonItem, i) => {
      if (i >= newMovieList.length) return skeletonItem.remove();

      this.#movieListContainer.replaceChild(newMovieList[i], skeletonItem);
    });

    this.toggleMoreButtonVisibility(hasNextPage);

    this.#skeletonList = [];
  }

  toggleMoreButtonVisibility(hasNextPage) {
    this.#moreButton.style.display = hasNextPage ? 'visible' : 'hidden';
  }

  clearMovieList() {
    this.#movieListContainer.replaceChildren();
  }

  async initHandleClickMoreButton() {
    this.pushMoreSkeletonList();
    await this.#handleMoreButton();
  }

  setTitle(title) {
    this.#sectionTitle.textContent = title;
  }
}

export default MovieContainer;
