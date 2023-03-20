import { Movie } from './movies.type';

export type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
};

export type TMDBErrorResponse = {
  success: boolean;
  status_code: number;
  status_message: string;
};

class Client {
  private static readonly API_KEY = process.env.TMDB_API_KEY;

  private static readonly BASE_URL = 'https://api.themoviedb.org/3';

  async fetch(path: string, init?: RequestInit): Promise<TMDBResponse> {
    const res = await fetch(`${Client.BASE_URL}${path}&api_key=${Client.API_KEY}`, init);
    if (!res.ok) throw await res.json();

    const response: TMDBResponse = await res.json();
    return response;
  }

  get(path: string, init?: Omit<RequestInit, 'method'>) {
    return this.fetch(path, { method: 'GET', ...init });
  }

  post(path: string, init?: Omit<RequestInit, 'method'>) {
    return this.fetch(path, { method: 'POST', ...init });
  }

  put(path: string, init?: Omit<RequestInit, 'method'>) {
    return this.fetch(path, { method: 'PUT', ...init });
  }

  getPopularMovies(page = 1): Promise<TMDBResponse> {
    return this.get(`/movie/popular?language=ko-KR&page=${page}`);
  }

  getSearchMovies(query: string, page = 1): Promise<TMDBResponse> {
    return this.get(`/search/movie?language=ko-KR&query=${query}&page=${page}&include_adult=false`);
  }
}

const client = new Client();

export default client;
