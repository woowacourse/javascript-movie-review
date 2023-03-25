import { TMDBGenres, TMDBResponse } from './response.type';
import { MovieFetcher } from './util/MovieFetcher';

class MovieAPI {
  async getPopularMovies(page = 1): Promise<TMDBResponse> {
    return MovieFetcher.fetch(
      '/movie/popular',
      `?language=ko-KR&page=${page}&api_key=${process.env.TMDB_API_KEY}`,
    );
  }

  async getSearchMovies(query: string, page = 1): Promise<TMDBResponse> {
    return MovieFetcher.fetch(
      '/search/movie',
      `?language=ko-KR&query=${query}&page=${page}&include_adult=false&api_key=${process.env.TMDB_API_KEY}`,
    );
  }

  async getGenreList(): Promise<TMDBGenres> {
    return MovieFetcher.fetch(
      '/genre/movie/list',
      `?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
    );
  }
}

export default new MovieAPI();
