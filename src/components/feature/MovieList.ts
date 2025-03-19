import {
  MovieItem as MovieItemType,
  MovieList as MovieListType,
} from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { Button } from '../common/Button';
import { Text } from '../common/Text';
import { MovieItem } from './MovieItem';

export const MovieList = ({
  page,
  results,
  total_pages,
  total_results,
}: MovieListType) => {
  const mainElement = <HTMLDivElement>createElement('main');
  const sectionElement = <HTMLDivElement>createElement('section', {
    classList: 'container',
  });

  const text = Text({
    classList: ['text-2xl', 'font-bold', 'mb-32'],
    props: {
      textContent: '지금 인기 있는 영화',
    },
  });

  const movieUl = <HTMLUListElement>createElement('ul', {
    classList: 'thumbnail-list',
  });

  movieUl.append(
    ...results.map((movie: MovieItemType) => {
      return MovieItem({ ...movie });
    }),
  );

  const moreBtn = Button({
    type: 'button',
    onClick: () => {},
    classList: ['w-full', 'primary'],
    props: {
      textContent: '더보기',
    },
  });

  mainElement.append(sectionElement);
  sectionElement.append(text, movieUl, moreBtn);

  const app = document.querySelector('#app');
  app?.appendChild(mainElement);

  return mainElement;
};
