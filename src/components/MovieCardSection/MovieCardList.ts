import MovieCard from './MovieCard';
import type { Movie } from '../../types/movie';

const MovieCardList = {
  template() {
    return `
      <ul class="item-list">
        ${MovieCardList.skeletonItems()}
      </ul>
    `;
  },
  skeletonItems() {
    return Array.from({ length: 20 }, () => MovieCard.template()).join('');
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

    if (!movieList) return;

    [...movieList.children].slice((page - 1) * 20).forEach((node, key) => {
      if (movies.length <= key) {
        node.remove();
      } else if (node instanceof HTMLLIElement) {
        MovieCard.paint(node, movies[key]);
      }
    });
  },
};

export default MovieCardList;
