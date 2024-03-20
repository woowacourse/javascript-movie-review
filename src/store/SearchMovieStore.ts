import { Movie } from '../index.d';

const searchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
};

class SearchMovieStore {
  #searchMoviesData: any[];

  #searchPageCount: number = 1;

  constructor() {
    this.#searchMoviesData = [];
  }

  async searchMovies(query: string) {
    const data: Movie[] = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko&page=${this.#searchPageCount}`,
      searchOptions,
    )
      .then((response) => response.json())
      .then((response) => response.results)
      .catch((err) => console.error(err));

    this.#pushNewData(data);

    return data;
  }

  increasePageCount() {
    this.#searchPageCount += 1;
  }

  #pushNewData(data: Movie[]) {
    if (data) {
      this.#searchMoviesData.push(...data);
    }
  }

  get movies() {
    return this.#searchMoviesData;
  }
}

const searchMovieStore = new SearchMovieStore();

export default searchMovieStore;
