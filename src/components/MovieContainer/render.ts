import MovieListBanner from '../MovieListBanner/MovieListBanner';
import isHTMLElement from '../../utils/isHTMLElement';
import MovieItem from '../MovieItem/MovieItem';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { Movie } from '../../domain/movie';

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
  const createShowMoreButton = ShowMoreButton();
  if (!isHTMLElement(ul)) return;
  [headerBanner, ul, createShowMoreButton].forEach((item) => section.appendChild(item));
};

export const renderHandler = (movies: Movie[]) => {
  const movieList = createMovieItems(movies);
  if (!movieList) return;
  assembleContent(movieList);
};
