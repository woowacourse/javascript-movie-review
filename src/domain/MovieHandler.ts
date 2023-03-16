import { Movie, MovieAPIData } from '../type/Movie';

const MovieHandler = {
  convertMovieList(moviesData: MovieAPIData[]) {
    const movieList: Movie[] = moviesData.map((data) => {
      const { id, title, poster_path, vote_average } = data;

      const movie: Movie = {
        id,
        title,
        poster_path,
        vote_average,
      };

      return movie;
    });

    return movieList;
  },
};

export default MovieHandler;
