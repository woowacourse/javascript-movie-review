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

    this.pushMoreSkeletonList();
  }

  pushMoreSkeletonList() {
    const skeletonMovieList = createSkeletonMovieList();

    skeletonMovieList.forEach((skeletonMovie) => {
      this.#movieListContainer.appendChild(skeletonMovie);
    });

    this.#skeletonList = skeletonMovieList;

    this.toggleMoreButtonVisibility();
  }

  replaceSkeletonListToData({ movieList, hasNextPage }) {
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
    this.pushMoreSkeletonList();
    await this.#handleMoreButton();
  }

  setTitle(title) {
    this.#sectionTitle.textContent = title;
  }
}

export default MovieContainer;
