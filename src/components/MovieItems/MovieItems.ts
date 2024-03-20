import { MovieListType, MovieType } from '../../types/movie';
import createMovieItem from '../MovieItem/MovieItem';
import './style.css';

const createMovieItems = (movieList: MovieListType) => {
  const ul = document.createElement('ul');
  ul.classList.add('item-list');

  movieList.forEach((movie: MovieType) => {
    ul.appendChild(createMovieItem(movie));
  });

  const movieContents = document.querySelector('.item-view');
  movieContents?.appendChild(ul);
  return ul;
};

export default createMovieItems;
