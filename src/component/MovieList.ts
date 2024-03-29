import { createSkeletonMovieItem } from './MovieItem';

const MAX_SINGLE_REQUEST_MOVIE_COUNT = 20;

function createSkeletonMovieList() {
  return Array.from({ length: MAX_SINGLE_REQUEST_MOVIE_COUNT }).map(() => {
    const movieItem = createSkeletonMovieItem();

    const li = document.createElement('li');
    li.append(movieItem);

    return li;
  });
}

export { createSkeletonMovieList };
