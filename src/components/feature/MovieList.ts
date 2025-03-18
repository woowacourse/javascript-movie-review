import {
  MovieItem as MovieItemType,
  MovieList as MovieListType,
} from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { Text } from '../common/Text';
import { MovieItem } from './MovieItem';

export const MovieList = ({
  page,
  results,
  total_pages,
  total_results,
}: MovieListType) => {
  const sectionElement = <HTMLDivElement>createElement('section');

  const text = Text({
    props: {
      textContent: '지금 인기 있는 영화',
    },
  });

  const movieUl = <HTMLUListElement>createElement('ul');
  movieUl.classList.add('thumbnail-list');

  movieUl.append(
    ...results.map((movie: MovieItemType) => {
      return MovieItem({ ...movie });
    }),
  );

  sectionElement.append(text, movieUl);

  const app = document.querySelector('#app');
  app?.appendChild(sectionElement);

  return sectionElement;
};
