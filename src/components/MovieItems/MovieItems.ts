import './style.css';
import { MovieListType, MovieType } from '../../types/movie';
import createMovieItem from '../MovieItem/MovieItem';

const createMovieItems = (movieList: MovieListType, isLastPage: boolean) => {
  const ul = document.createElement('ul');
  ul.classList.add('item-list');

  movieList.forEach((movie: MovieType) => {
    ul.appendChild(createMovieItem(movie));
  });

  const showMoreButton = document.querySelector('.btn');
  showMoreButton?.insertAdjacentElement('beforebegin', ul);

  if (isLastPage) showMoreButton?.remove();

  return ul;
};

export default createMovieItems;
