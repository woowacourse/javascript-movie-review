import MovieItem from './MovieItem';
import SkeletonMovieItem from './skeletonMovieItem';
import NothingMovieList from './NothingMovieList';
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
    $ul.appendChild(SkeletonMovieItem());
  });

  return $ul;
};

export default MovieList;
