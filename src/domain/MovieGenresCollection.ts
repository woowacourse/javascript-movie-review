import MovieGenres from '../api/MovieGenres';

import { Genre } from '../types/ResponseMovieGenres';

const MovieGenresCollection = {
  initialize() {
    MovieGenres.list().then((result) => {
      localStorage.setItem('genres', JSON.stringify(result.genres));
    });
  },

  getAllGenres(): Genre[] {
    return JSON.parse(localStorage.getItem('genres') ?? '[]');
  },

  getGenreNameByGenreId(id: number) {
    return this.getAllGenres().find((genre) => genre.id === id)?.name;
  },
};

export default MovieGenresCollection;
