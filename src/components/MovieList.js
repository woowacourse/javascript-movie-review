import MovieItem from './MovieItem';
import NothingMovieList from './NothingMovieList';
import test from './test';
import createElement from './utils/createElement';

const MovieList = ({ movies }) => {
  const $ul = createElement({
    tag: 'ul',
    classNames: ['thumbnail-list'],
  });
  
  if(movies.length === 0) {
    return NothingMovieList();
  }

  movies.forEach((movie) => {
    $ul.appendChild(MovieItem({ movie }));
  });

  movies.forEach(() => {
    $ul.appendChild(test());
  });

  return $ul;
};

export default MovieList;
