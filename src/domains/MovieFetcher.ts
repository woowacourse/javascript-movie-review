import { MovieType, APIMovieType } from '../types';

class MovieFetcher {
  #currentPage = 1;

  async fetchMovieInfoByPopularity(): Promise<MovieType[] | undefined> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        process.env.API_KEY
      }&language=en-US&page=${this.#currentPage}`,
    );

    if (!response.ok) {
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
