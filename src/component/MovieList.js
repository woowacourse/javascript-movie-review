import { createMovieItem, createSkeletonMovieItem } from './MovieItem.js';

const MAX_SINGLE_REQUEST_MOVIE_COUNT = 20;

function createSkeletonMovieList(movieList) {
  const list = movieList || new Array(MAX_SINGLE_REQUEST_MOVIE_COUNT).fill();

  return list.map((movie) => {
    const movieItem = movie ? createMovieItem(movie.data) : createSkeletonMovieItem();

    const li = document.createElement('li');
    li.append(movieItem);

    return li;
  });
}

export { createSkeletonMovieList };
