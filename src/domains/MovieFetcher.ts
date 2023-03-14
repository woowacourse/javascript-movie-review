import { PopularMovieType, APIPopularMovieType } from '../types';
import API_KEY from '../apikey.js';

class MovieFetcher {
  #currentPage = 1;

  async fetchMovieInfoByPopularity() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${
        this.#currentPage
      }`,
    );

    if (!response.ok) {
      return;
    }

    const responseText = await response.text();
    const parsedResponseText = JSON.parse(responseText);

    const popularMovieInfos = parsedResponseText.results.map(
      (currentResult: APIPopularMovieType) => ({
        title: currentResult.title,
        posterPath: currentResult.poster_path,
        voteAverage: currentResult.vote_average,
        popularity: currentResult.popularity,
      }),
    );
    this.#currentPage += 1;
    return [...popularMovieInfos].sort(
      (x: PopularMovieType, y: PopularMovieType) => y.popularity - x.popularity,
    );
  }
}

export default MovieFetcher;
