import { Movie } from '../type/Movie';
import { MovieAPIData, getGenreAPIData } from '../api/get';

const genreList: Map<number, string> = new Map();
getGenreAPIData().then((genres) => {
  genres.forEach((genre) => {
    genreList.set(genre.id, genre.name);
  });
});

const MovieHandler = {
  convertMovieList(moviesData: MovieAPIData[]) {
    const movieList: Movie[] = moviesData.map((data) => {
      const { id, title, poster_path, vote_average, overview, genre_ids } = data;

      const movie: Movie = {
        id,
        title,
        posterPath: poster_path,
        voteAverage: vote_average,
        overview,
        genreIDs: genre_ids,
      };

      return movie;
    });

    return movieList;
  },

  getGenres(genreIDs: number[]) {
    return genreIDs.map((id) => genreList.get(id)).join(', ');
  },
};

export default MovieHandler;
