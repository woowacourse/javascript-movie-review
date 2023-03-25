import { Movie } from '../../domain/movie.type';
import { HttpClientError } from '../errors/HttpClientError';
import { HttpClient } from '../HttpClient';
import { MovieResponse, MoviesAPI, MoviesResponse, PaginatedParams } from '../interfaces/MoviesAPI';
import { TMDBAPISpec } from './TMDBClient.api';
import { TMDBClientProps, TMDBLanguage, TMDBMovie } from './TMDBClient.type';

export class TMDBClient extends HttpClient<TMDBAPISpec> implements MoviesAPI {
  apiKey: string;

  language: TMDBLanguage;

  constructor({
    base = 'https://api.themoviedb.org',
    apiKey,
    language = 'ko-KR',
  }: TMDBClientProps) {
    super(base);

    this.apiKey = apiKey;
    this.language = language;
  }

  override getURL(path: string) {
    const url = super.getURL(path);
    url.searchParams.set('language', this.language);
    url.searchParams.set('api_key', this.apiKey);
    return url;
  }

  private parseMovie(movie: TMDBMovie): Movie {
    return {
      id: String(movie.id),
      title: movie.title,
      voteAverage: movie.vote_average,
      posterPath: movie.poster_path,
      overview: movie.overview,
    };
  }

  async getPopularMovies(params: PaginatedParams): Promise<MoviesResponse> {
    const response = await this.get('/3/movie/popular', params);

    if (response.status !== 200) {
      throw new HttpClientError(response.data.status_message);
    }

    return {
      movies: response.data.results.map((movie) => this.parseMovie(movie)),
      page: response.data.page,
      totalMovies: response.data.total_results,
      totalPages: response.data.total_pages,
    };
  }

  async searchMovies(params: PaginatedParams<{ query: string }>): Promise<MoviesResponse> {
    const response = await this.get('/3/search/movie', params);

    if (response.status !== 200) {
      throw new HttpClientError(response.data.status_message);
    }

    return {
      movies: response.data.results.map((movie) => this.parseMovie(movie)),
      page: response.data.page,
      totalMovies: response.data.total_results,
      totalPages: response.data.total_pages,
    };
  }

  async getMovie({ id }: { id: string }): Promise<MovieResponse> {
    const numericId = Number(id);
    const response = await this.get(`/3/movie/${numericId}`);

    if (response.status !== 200) {
      throw new HttpClientError(response.data.status_message);
    }

    return {
      ...this.parseMovie(response.data),

      genres: response.data.genres.map(({ name }) => name),
    };
  }
}
