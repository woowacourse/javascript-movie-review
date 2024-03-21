import ErrorPage from '../components/ErrorPage';
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
    // Skeleton UI 확인을 위한 강제 delay
    await this.#delay();

    const responseData: any = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${this.#query}&include_adult=false&language=ko&page=${this.#presentPage}`,
      searchOptions,
    )
      .then(async (response) => {
        // 4xx, 5xx 에러 처리
        if (!response.ok) {
          new ErrorPage(String(response.status)).renderError();
        }
        const responseJSON = await response.json();

        // 검색 결과가 없는 경우
        if (String(response.status)[0] === '2' && responseJSON.results.length === 0) {
          new ErrorPage(String(response.status)).renderError();
        }
        return responseJSON;
      })
      .then((response) => response)
      .catch((err) => console.error(err));

    const { results } = responseData;

    this.#totalPages = responseData.total_pages;

    this.#pushNewData(results);

    return results;
  }

  async #delay() {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000);
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
