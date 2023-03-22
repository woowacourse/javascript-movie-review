import MovieCard from './MovieCard';

import { DEFAULT_LIST_LENGTH } from '../../constants';
import { CLASS } from '../../constants/selector';
import { $ } from '../../utils/dom';

import type { AppMovie } from '../../types/movie';

const MovieCardList = {
  template() {
    return `
      <ul class=${CLASS.ITEM_LIST}></ul>
    `;
  },

  skeletonItems() {
    return MovieCard.template().repeat(DEFAULT_LIST_LENGTH);
  },

  renderSkeletonItems(isCurrentQuery: boolean) {
    const movieList = $<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    movieList.classList.remove(CLASS.HIDE);

    if (isCurrentQuery) {
      movieList.insertAdjacentHTML('beforeend', MovieCardList.skeletonItems());
      return;
    }

    movieList.innerHTML = MovieCardList.skeletonItems();
  },

  paint(movies: AppMovie[], page: number = 1) {
    const movieList = $<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);
    const startLine = (page - 1) * DEFAULT_LIST_LENGTH;

    [...movieList.children].slice(startLine).forEach((child, key) => {
      if (movies.length <= key) {
        child.remove();
      } else if (child instanceof HTMLLIElement) {
        MovieCard.paint(child, movies[key]);
      }
    });
  },

  handleVisibility(state: boolean) {
    const movieList = $<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    if (state) {
      return movieList.classList.add(CLASS.HIDE);
    }

    return movieList.classList.remove(CLASS.HIDE);
  },

  removeSkeleton() {
    const movieList = $<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    [...movieList.children].slice(-DEFAULT_LIST_LENGTH).forEach((child) => {
      child.remove();
    });
  },
};

export default MovieCardList;
