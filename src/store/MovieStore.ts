import { Movie } from '../index.d';

import ErrorRender from '../components/ErrorRender';

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
    // Skeleton UI 확인을 위한 강제 delay
    await this.#delay();

    const responseData: Movie[] = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko&page=${this.#pageCount}`,
      options,
    )
      .then(async (response) => {
        if (!response.ok) {
          new ErrorRender(String(response.status)).renderError();
        }
        const responseJSON = await response.json();

        // 검색 결과가 없는 경우
        if (String(response.status)[0] === '2' && responseJSON.results.length === 0) {
          new ErrorRender(String(response.status)).renderError();
        }
        return responseJSON;
      })
      .then((response) => response.results)
      .catch((err) => console.error(err));

    this.#pushNewData(responseData);

    return responseData;
  }

  async #delay() {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000);
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
