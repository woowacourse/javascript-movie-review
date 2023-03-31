import { Movie } from '../type/Movie';
import { MovieAPIData, Genre } from '../api/types';

const MovieHandler = {
  convertMovieList(moviesData: MovieAPIData[]) {
    const movieList: Movie[] = moviesData.map((data) => {
      const { id, title, poster_path: posterPath, vote_average: voteAverage } = data;

      const movie: Movie = {
        id,
        title,
        posterPath,
        voteAverage,
      };

      return movie;
    });

    return movieList;
  },

  convertGenreList(genres: Genre[]) {
    return genres.map((genre) => genre.name);
  },
};

export default MovieHandler;
