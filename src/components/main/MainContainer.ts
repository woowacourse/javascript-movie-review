import { MovieData } from '../../api/type.ts';
import { MovieItem } from './MovieItem.ts';

export const MainContainer = (movieList: MovieData[]) => {
  const $main = document.createElement('main');
  const $section = document.createElement('section');

  const $h2 = document.createElement('h2');
  $h2.textContent = '지금 인기 있는 영화';

  const $ul = document.createElement('ul');
  $ul.className = 'thumbnail-list';

  const $fragment = new DocumentFragment();
  movieList.forEach((movie) => $fragment.append(MovieItem(movie)));

  $ul.append($fragment);
  $section.append($h2, $ul);
  $main.append($section);

  return $main;
};
