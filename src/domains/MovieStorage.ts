import { MovieType, GenreType, StorageMovieType } from '../types';

class MovieStorage {
  private genres = new Map<number, string>();
  private movies = new Map<number, StorageMovieType>();

  setGenres(genres: GenreType[]) {
    console.log(genres);
    genres.forEach(({ id, name }) => {
      this.genres.set(id, name);
    });
  }

  addMovies(movies: MovieType[]) {
    movies.forEach((movie) => {
      console.log(movie.genreIds);
      this.movies.set(movie.id, {
        ...movie,
        convertedGenres: this.getConvertedGenres(movie.genreIds),
      });
    });
  }

  getMovieById(id: number) {
    return this.movies.get(id) || new Error('해당하는 ID의 영화를 불러오지 못 했습니다.');
  }

  private getConvertedGenres(genreIds: number[]) {
    return genreIds.map((id) => this.genres.get(id) || '???');
  }
}

export default new MovieStorage();
