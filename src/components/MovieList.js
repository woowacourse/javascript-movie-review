import createElement from './utils/createElement';
import MovieItem from './MovieItem';

const MovieList = ({ popularMovies }) => {
  const $ul = createElement({
    tag: 'ul',
    classNames: ['thumbnail-list'],
  });

  popularMovies.forEach((popularMovie) => {
    $ul.appendChild(MovieItem({ popularMovie }));
  });

  return $ul;
};

export default MovieList;
