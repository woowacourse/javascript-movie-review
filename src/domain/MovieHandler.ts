import { Movie } from '../type/Movie';
import { MovieAPIData } from '../api/get';

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
};

export default MovieHandler;
