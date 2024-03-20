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

  async getMovies() {
    const data: Movie[] = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko&page=${this.#pageCount}`,
      options,
    )
      .then((response) => response.json())
      .then((response) => response.results)
      .catch((err) => console.error(err));

    this.#pushNewData(data);

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
