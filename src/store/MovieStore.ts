import { Movie } from '../index.d';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
};

class MovieStore {
  #moviesData: any[];

  #pageCount: number = 1;

  constructor() {
    this.#moviesData = [];
  }

  /* eslint-disable max-lines-per-function */
  async getMovies() {
    const data: Movie[] = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko&page=${this.#pageCount}`,
      options,
    )
      .then((response) => response.json())
      .then((response) => response.results)
      .catch((err) => console.error(err));

    this.#pushNewData(data);

    // Skeleton UI 확인을 위한 강제 delay
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    await delay(2000);
    return data;
  }

  increasePageCount() {
    this.#pageCount += 1;
  }

  #pushNewData(data: Movie[]) {
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
