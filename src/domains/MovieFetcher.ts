import { MovieType, APIMovieType } from '../types';

class MovieFetcher {
  #currentPage = 1;

  resetPage() {
    this.#currentPage = 1;
  }

  async fetchMovieInfoByPopularity(): Promise<MovieType[] | undefined> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        process.env.API_KEY
      }&language=en-US&page=${this.#currentPage}`,
    );

    if (!response.ok) {
      // 페이지 501일 때 422 에러 처리하기
      const responseText = await response.text();
      console.log(response.status);
      const parsedResponseText = JSON.parse(responseText);
      console.log(parsedResponseText.success);
      console.log(parsedResponseText.errors[0]); // 에러 메시지 출력

      return;
    }

    const responseText = await response.text();
    const parsedResponseText = JSON.parse(responseText);

    const popularMovieInfos = parsedResponseText.results.map((currentResult: APIMovieType) => ({
      title: currentResult.title,
      posterPath: currentResult.poster_path,
      voteAverage: currentResult.vote_average,
    }));

    this.#currentPage += 1;

    return popularMovieInfos;
  }

  async fetchMovieInfoByKeyword(keyword: string): Promise<MovieType[] | undefined> {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.API_KEY
      }&language=en-US&query=${keyword}&page=${this.#currentPage}&include_adult=false`,
    );

    if (!response.ok) {
      // 페이지 1001일 때 400 에러 처리하기
      const responseText = await response.text();
      console.log(response.status);
      const parsedResponseText = JSON.parse(responseText);
      console.log(parsedResponseText.success);
      console.log(parsedResponseText.errors[0]); // 에러 메시지 출력

      return;
    }

    const responseText = await response.text();
    const parsedResponseText = JSON.parse(responseText);

    const popularMovieInfos = parsedResponseText.results.map((currentResult: APIMovieType) => ({
      title: currentResult.title,
      posterPath: currentResult.poster_path,
      voteAverage: currentResult.vote_average,
    }));

    this.#currentPage += 1;

    return popularMovieInfos;
  }
}

export default MovieFetcher;
