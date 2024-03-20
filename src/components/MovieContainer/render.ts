import MovieListBanner from '../MovieListBanner/MovieListBanner';
import isHTMLElement from '../../utils/isHTMLElement';
import { MovieItemProps } from '../../types/movie';
import MovieItem from '../MovieItem/MovieItem';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

export const createMovieItems = (results: MovieItemProps[]) => {
  const ul = document.querySelector('ul');
  if (!isHTMLElement(ul)) return;
  const fragment = document.createDocumentFragment();
  results.map((movieItem: MovieItemProps) => {
    fragment.appendChild(MovieItem(movieItem));
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

export const renderHandler = (results: MovieItemProps[]) => {
  const movieList = createMovieItems(results);
  if (!movieList) return;
  assembleContent(movieList);
};
