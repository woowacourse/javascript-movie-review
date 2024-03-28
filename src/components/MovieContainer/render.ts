import MovieListBanner from '../MovieListBanner/MovieListBanner';
import isHTMLElement from '../../utils/isHTMLElement';
import { TotalMovieItemProps } from '../../types/movie';
import MovieItem from '../MovieItem/MovieItem';
import createElement from '../../utils/createElement';

export const createMovieItems = (results: TotalMovieItemProps[]) => {
  const ul = document.querySelector('ul');
  if (!isHTMLElement(ul)) return;

  const fragment = document.createDocumentFragment();
  results.map((movieItem: TotalMovieItemProps) => {
    fragment.appendChild(MovieItem(movieItem));
  });
  ul.appendChild(fragment);

  return ul;
};

const assembleContent = (ul: HTMLElement) => {
  const section = document.querySelector('section');
  if (!isHTMLElement(section)) return;

  const contentCard = createElement('div', { className: 'content-card' });
  const headerBanner = MovieListBanner();
  if (!headerBanner) return;
  if (!isHTMLElement(ul)) return;

  [headerBanner, ul].forEach((item) => contentCard.appendChild(item));
  section.appendChild(contentCard);
};

export const renderHandler = (results: TotalMovieItemProps[]) => {
  const movieList = createMovieItems(results);
  if (!movieList) return;

  assembleContent(movieList);
};
