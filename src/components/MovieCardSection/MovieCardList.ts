import MovieCard from './MovieCard';
import type { Movie } from '../../types/movie';
import { DEFAULT_LIST_LENGTH } from '../../constants';
import { CLASS } from '../../constants/selector';

const MovieCardList = {
  template() {
    return `
      <ul class=${CLASS.ITEM_LIST}>
        ${MovieCardList.skeletonItems()}
      </ul>
    `;
  },

  skeletonItems() {
    return MovieCard.template().repeat(DEFAULT_LIST_LENGTH);
  },

  renderMoreItems() {
    const movieList = document.querySelector<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    movieList?.insertAdjacentHTML('beforeend', MovieCardList.skeletonItems());
  },

  render() {
    const movieList = document.querySelector<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    if (movieList === null) return;

    movieList.classList.remove(CLASS.HIDE);
    movieList.innerHTML = MovieCardList.skeletonItems();
  },

  paint(movies: Movie[], page: number = 1) {
    const movieList = document.querySelector<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    if (movieList === null) return;

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
    const movieList = document.querySelector<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    if (state) {
      return movieList?.classList.add(CLASS.HIDE);
    }

    return movieList?.classList.remove(CLASS.HIDE);
  },

  removeSkeleton() {
    const movieList = document.querySelector<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    if (movieList === null) return;

    [...movieList.children].slice(-DEFAULT_LIST_LENGTH).forEach((child) => {
      child.remove();
    });
  },
};

export default MovieCardList;
