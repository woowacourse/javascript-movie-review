import { MovieListType } from '../types/movie';

const filterMovieList = (movieList: MovieListType) =>
  movieList.map((movie) => ({
    id: movie.id,
    poster_path: movie.poster_path,
    title: movie.title,
    vote_average: movie.vote_average,
  }));

export default filterMovieList;
