import { Movie } from '../type/Movie';

const MovieListMaker = (moviesData: []) => {
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
};

export default MovieListMaker;
