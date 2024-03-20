import { $ } from '../util/selector.js';
import createButton from './Button.js';
import { createMovieList } from './MovieList.js';

class MovieContainer {
  #movieListContainer;
  #sectionTitle;
  #skeletonList;
  #moreButton;

  constructor(title) {
    this.#movieListContainer = $('ul.item-list');

    this.#sectionTitle = $('.item-view > h2');
    this.#sectionTitle.textContent = title;

    this.#moreButton = createButton({ size: 'full-width', variant: 'primary', name: '더 보기 ', type: 'button' });
    this.toggleMoreButtonVisibility();

    $('section').append(this.#moreButton);

    this.pushMoreSkeletonList();
  }

  pushMoreSkeletonList() {
    const skeletonMovieList = createMovieList();
    console.log(skeletonMovieList);
    skeletonMovieList.forEach((skeletonMovie) => {
      this.#movieListContainer.appendChild(skeletonMovie);
    });
    // this.#movieListContainer.append(...skeletonMovieList);

    this.#skeletonList = skeletonMovieList;

    this.toggleMoreButtonVisibility();
  }

  replaceSkeletonListToData({ movieList, hasNextPage }) {
    const newMovieList = createMovieList(movieList);

    this.#skeletonList.forEach((skeletonItem, i) => (skeletonItem = newMovieList[i]));

    this.toggleMoreButtonVisibility(hasNextPage);
  }

  toggleMoreButtonVisibility(hasNextPage) {
    this.#moreButton.style.display = hasNextPage ? 'visible' : 'hidden';
  }

  clearMovieList() {
    this.#movieListContainer.replaceChildren();
  }
}

export default MovieContainer;
