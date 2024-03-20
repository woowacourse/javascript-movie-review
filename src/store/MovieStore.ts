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

  constructor() {
    this.#moviesData = [];
  }

  async getMovies() {
    const data: Movie[] = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then((response) => response.json())
      .then((response) => response.results)
      .catch((err) => console.error(err));

    if (data) {
      this.#moviesData.push(...data);
    }
    // TODO:error
  }

  get movies() {
    return this.#moviesData;
  }
}

const movieStore = new MovieStore();

export default movieStore;
