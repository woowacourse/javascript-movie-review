import { Genre, Movie } from './movies.type';

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

export type TMDBGenres = {
  genres: Genre[];
};

class MovieAPI {
  private static readonly BASE_URL = 'https://api.themoviedb.org/3';

  async fetch(path: string): Promise<TMDBResponse> {
    const res = await fetch(`${MovieAPI.BASE_URL}${path}&api_key=${process.env.TMDB_API_KEY}`);
    if (!res.ok) throw await res.json();

    const response: TMDBResponse = await res.json();
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

  async getGenreList(): Promise<TMDBGenres> {
    const res = await fetch(
      `${MovieAPI.BASE_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
    );
    if (!res.ok) throw await res.json();

    const response: TMDBGenres = await res.json();
    return response;
  }

  getGenreListURL(): string {
    return `${MovieAPI.BASE_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`;
  }
}

export default new MovieAPI();
