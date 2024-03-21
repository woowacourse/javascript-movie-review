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

  #totalPages: number = 0;

  #query: string = '';

  #presentPage: number = 1;

  constructor() {
    this.#searchMoviesData = [];
  }

  /* eslint-disable max-lines-per-function */
  async searchMovies() {
    const responseData: any = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${this.#query}&include_adult=false&language=ko&page=${this.#presentPage}`,
      searchOptions,
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));

    const { results } = responseData;
    console.log(results);

    this.#totalPages = responseData.total_pages;

    this.#pushNewData(results);

    // Skeleton UI 확인을 위한 강제 delay
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000);

    return results;
  }

  increasePageCount() {
    this.#presentPage += 1;
  }

  #pushNewData(data: Movie[]) {
    if (data) {
      this.#searchMoviesData.push(...data);
    }
  }

  get movies() {
    return this.#searchMoviesData;
  }

  get totalPages() {
    return this.#totalPages;
  }

  get presentPage() {
    return this.#presentPage;
  }

  get query() {
    return this.#query;
  }

  set query(query: string) {
    this.#query = query;
  }
}

const searchMovieStore = new SearchMovieStore();

export default searchMovieStore;
