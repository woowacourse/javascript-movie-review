import Movies, { MovieDetail } from '../domain/Movies';

class MovieDetailController {
  #movies;
  #storage;

  constructor(storage: Storage) {
    this.#movies = new Movies();
    this.#storage = storage;
  }

  #getMovieDetails(): MovieDetail[] {
    const movieDetails = this.#storage.getItem('movieDetails') ?? '{}';

    return JSON.parse(movieDetails);
  }

  async getMovieDetail(movieId: number) {
    const movieDetails = this.#getMovieDetails();
    if (movieDetails[movieId]) {
      return movieDetails[movieId];
    }

    const movieDetail: MovieDetail = await this.#movies.getMovieDetail(movieId);
    movieDetails[movieId] = movieDetail;
    this.#storage.setItem('movieDetails', JSON.stringify(movieDetails));

    return movieDetails[movieId];
  }

  updateMovieDetail(movieId: number, grade: number) {
    const movieDetails = this.#getMovieDetails();
    const movieDetail = movieDetails[movieId];
    movieDetail.my_grade = grade;

    this.#storage.setItem(
      'movieDetails',
      JSON.stringify({ ...movieDetails, [movieId]: movieDetail }),
    );
  }
}

export default MovieDetailController;
