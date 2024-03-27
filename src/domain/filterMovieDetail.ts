import { MovieDetailType } from '../types/movie';

const filterMovieDetail = (movie: MovieDetailType) => ({
  id: movie.id,
  poster_path: movie.poster_path,
  title: movie.title,
  vote_average: movie.vote_average,
  genres: movie.genres,
  overview: movie.overview,
});

export default filterMovieDetail;
