import MovieItem from './MovieItem';
import SkeletonMovieItem from './SkeletonMovieItem';
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

  if(movies === "loading") {
    [1,1,1].forEach(() => {
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
