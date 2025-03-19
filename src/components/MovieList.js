import createElement from './utils/createElement';
import MovieItem from './MovieItem';

const MovieList = ({ movies }) => {
  const $ul = createElement({
    tag: 'ul',
    classNames: ['thumbnail-list'],
  });

  movies.forEach((movie) => {
    $ul.appendChild(MovieItem({ movie }));
  });

  return $ul;
};

export default MovieList;
