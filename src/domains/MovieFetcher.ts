import { MovieType, APIMovieType, ResponseType } from '../types';

class MovieFetcher {
  #currentPage = 1;

  resetPage() {
    this.#currentPage = 1;
  }

  async fetchMovieInfoByPopularity(): Promise<ResponseType> {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          process.env.API_KEY
        }&language=en-US&page=${this.#currentPage}`,
      );

      if (!response.ok) {
        const responseText = await response.text();
        const parsedResponseText = JSON.parse(responseText);

        if (response.status === 422) return { result: 'PAGE_ERROR' };
        if (response.status >= 400 && response.status <= 499) return { result: 'CLIENT_ERROR' };
        if (response.status >= 500 && response.status <= 599) return { result: 'SERVER_ERROR' };
        return { result: '' };
      }

      const responseText = await response.text();
      const parsedResponseText = JSON.parse(responseText);

      const movieList = parsedResponseText.results.map((currentResult: APIMovieType) => ({
        title: currentResult.title,
        posterPath: currentResult.poster_path,
        voteAverage: currentResult.vote_average,
      }));

      if (movieList.length === 0) {
        return { result: 'EMPTY_LIST' };
      }

      this.#currentPage += 1;

      return { result: 'OK', movieList };
    } catch (error) {
      return { result: 'SYSTEM_CRASHED' };
    }
  }

  async fetchMovieInfoByKeyword(keyword: string): Promise<ResponseType> {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.API_KEY
        }&language=en-US&query=${keyword}&page=${this.#currentPage}&include_adult=false`,
      );

      if (!response.ok) {
        const responseText = await response.text();
        const parsedResponseText = JSON.parse(responseText);

        if (response.status === 422) return { result: 'PAGE_ERROR' };
        if (response.status >= 400 && response.status <= 499) return { result: 'CLIENT_ERROR' };
        if (response.status >= 500 && response.status <= 599) return { result: 'SERVER_ERROR' };
        return { result: '' };
      }

      const responseText = await response.text();
      const parsedResponseText = JSON.parse(responseText);

      const movieList = parsedResponseText.results.map((currentResult: APIMovieType) => ({
        title: currentResult.title,
        posterPath: currentResult.poster_path,
        voteAverage: currentResult.vote_average,
      }));

      this.#currentPage += 1;

      return { result: 'OK', movieList };
    } catch (error) {
      return { result: 'SYSTEM_CRASHED' };
    }
  }
}

export default MovieFetcher;
