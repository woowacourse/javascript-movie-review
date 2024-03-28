import { MovieDetailAPIReturnType, MovieItemReturnType } from '../../api/movieAPI.type';
import type { Movie, MovieDetail } from '../../types/movie';

type RawMovieDataType = MovieItemReturnType | MovieDetailAPIReturnType;

const MovieDomain = {
  formatMovieItem(movie: MovieItemReturnType): Movie {
    const formattedMovie = {
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: Number(movie.vote_average?.toFixed(1)),
    };

    return formattedMovie;
  },

  formatMovieDetail(movie: MovieDetailAPIReturnType): MovieDetail {
    const formattedMovie = {
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: Number(movie.vote_average?.toFixed(1)),
      genres: movie.genres.map(genre => genre.name),
      overview: movie.overview,
    };

    return formattedMovie;
  },
};

export default MovieDomain;
