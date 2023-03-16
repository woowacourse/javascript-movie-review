import MovieCard from './MovieCard';
import type { Movie } from '../../types/movie';
import { DEFAULT_LIST_LENGTH } from '../../constants';

const MovieCardList = {
  template() {
    return `
      <ul class="item-list">
        ${MovieCardList.skeletonItems()}
      </ul>
    `;
  },
  skeletonItems() {
    return Array.from({ length: DEFAULT_LIST_LENGTH }, () => MovieCard.template()).join('');
  },
  renderMoreItems() {
    const movieList = document.querySelector<HTMLUListElement>('.item-list');

    movieList?.insertAdjacentHTML('beforeend', MovieCardList.skeletonItems());
  },
  render() {
    const movieList = document.querySelector<HTMLUListElement>('.item-list');

    if (movieList === null) return;

    movieList.innerHTML = MovieCardList.skeletonItems();
  },
  paint(movies: Movie[], page: number = 1) {
    const movieList = document.querySelector<HTMLUListElement>('.item-list');

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
    const movieList = document.querySelector<HTMLUListElement>('.item-list');

    if (state) {
      return movieList?.classList.add('hide');
    }

    return movieList?.classList.remove('hide');
  },
  removeSkeleton() {
    const movieList = document.querySelector<HTMLUListElement>('.item-list');

    if (movieList === null) return;

    [...movieList.children].slice(-DEFAULT_LIST_LENGTH).forEach((child) => {
      child.remove();
    });
  },
};

export default MovieCardList;
