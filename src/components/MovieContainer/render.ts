import MovieListBanner from '../MovieListBanner/MovieListBanner';
import isHTMLElement from '../../utils/isHTMLElement';
import MovieItem from '../MovieItem/MovieItem';
import { Movie } from '../../domain/movie';
import createElement from '../../utils/createElement';

export const createMovieItems = (movies: Movie[]) => {
  const ul = document.querySelector('ul');
  if (!isHTMLElement(ul)) return;
  const fragment = document.createDocumentFragment();
  movies.map((movie: Movie) => {
    fragment.appendChild(MovieItem(movie));
  });
  ul.appendChild(fragment);
  return ul;
};

const assembleContent = (ul: HTMLElement) => {
  const section = document.querySelector('section');
  if (!isHTMLElement(section)) return;
  const headerBanner = MovieListBanner();
  if (!headerBanner) return;
  [headerBanner, ul].forEach((item) => section.appendChild(item));
};

export const renderHandler = (movies: Movie[]) => {
  const movieList = createMovieItems(movies);
  if (!movieList) return;
  assembleContent(movieList);
};
