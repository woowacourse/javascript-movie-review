import { Movie } from './movies.type';

export type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
};

class Client {
  private static readonly BASE_URL = 'https://api.themoviedb.org/3';

  async fetch(path: string): Promise<TMDBResponse> {
    const response: TMDBResponse = await fetch(
      `${Client.BASE_URL}${path}&api_key=${process.env.TMDB_API_KEY}`,
    ).then((res) => res.json());

    return response;
  }

  async getPopularMovies(page = 1): Promise<TMDBResponse> {
    return this.fetch(`/movie/popular?language=ko-KR&page=${page}`);
  }

  async getSearchMovies(query: string, page = 1): Promise<TMDBResponse> {
    return this.fetch(
      `/search/movie?language=ko-KR&query=${query}&page=${page}&include_adult=false`,
    );
  }
}

const client = new Client();

export default client;
