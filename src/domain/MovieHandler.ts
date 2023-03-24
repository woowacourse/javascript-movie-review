import { Movie } from '../type/Movie';
import { MovieAPIData } from '../api/get';

const MovieHandler = {
  convertMovieList(moviesData: MovieAPIData[]) {
    const movieList: Movie[] = moviesData.map((data) => {
      const { id, title, poster_path, vote_average, overview } = data;

      const movie: Movie = {
        id,
        title,
        posterPath: poster_path,
        voteAverage: vote_average,
        overview,
      };

      return movie;
    });

    return movieList;
  },
};

export default MovieHandler;
