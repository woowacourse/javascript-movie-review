import createElement from './utils/createElement';
import MovieItem from './MovieItem';

const MovieList = () => {
  const $ul = createElement({
    tag: 'ul',
    classNames: ['thumbnail-list'],
  });

  for (let i = 0; i < 30; i++) {
    $ul.appendChild(MovieItem());
  }

  return $ul;
};

export default MovieList;
