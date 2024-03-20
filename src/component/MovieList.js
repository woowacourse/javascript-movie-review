import { createSkeletonMovieItem } from './MovieItem.js';

const MAX_SINGLE_REQUEST_MOVIE_COUNT = 20;

function createSkeletonMovieList() {
  const list = new Array(MAX_SINGLE_REQUEST_MOVIE_COUNT).fill();

  return list.map(() => {
    const movieItem = createSkeletonMovieItem();

    const li = document.createElement('li');
    li.append(movieItem);

    return li;
  });
}

export { createSkeletonMovieList };
