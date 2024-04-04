import MovieApi from '../API/MovieApi';
import { Movie } from '../index.d';

class MovieStore {
  #moviesData: Movie[] = [];

  #pageCount: number = 1;

  async getMovies() {
    const responseData = await MovieApi.getPopularMovies(this.#pageCount);

    const moviesData = responseData.results;

    this.#pushNewMovies(moviesData);
    this.increasePageCount();

    return moviesData;
  }

  increasePageCount() {
    this.#pageCount += 1;
  }

  #pushNewMovies(data: Movie[]) {
    if (data) {
      this.#moviesData.push(...data);
    }
  }

  get movies() {
    return this.#moviesData;
  }
}

const movieStore = new MovieStore();

export default movieStore;
