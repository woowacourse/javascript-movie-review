import MovieItem from './MovieItem';
import SkeletonMovieItem from './SkeletonMovieItem';
import NothingMovieList from './NothingMovieList';
import createElement from './utils/createElement';

const SKELETON_ITEMS_COUNT = 20;

const MovieList = ({ movies }) => {
  const $ul = createElement({
    tag: 'ul',
    classNames: ['thumbnail-list'],
  });
  
  if(movies.length === 0) {
    return NothingMovieList();
  }

  if(movies === "loading") {
    Array(SKELETON_ITEMS_COUNT).fill(null).forEach(() => {
      $ul.appendChild(SkeletonMovieItem());
    });
  }

  else {
    movies.forEach((movie) => {
      $ul.appendChild(MovieItem({ movie }));
    });
  }


  return $ul;
};

export default MovieList;
