import { Movie } from '../../domain/movie.type';
import { Client } from '../Client';
import { MoviesAPI, MoviesResponse, PaginatedParams } from '../interfaces/MoviesAPI';
import { TMDBAPISpec, TMDBClientProps, TMDBLanguage, TMDBMovie } from './TMDBClient.type';

export class TMDBClient extends Client<TMDBAPISpec> implements MoviesAPI {
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
    };
  }

  async getPopularMovies(params: PaginatedParams): Promise<MoviesResponse> {
    const response = await this.get('/3/movie/popular', params);

    return {
      movies: response.data.results.map((movie) => this.parseMovie(movie)),
      page: response.data.page,
      totalMovies: response.data.total_results,
      totalPages: response.data.total_pages,
    };
  }

  async searchMovies(params: PaginatedParams<{ query: string }>): Promise<MoviesResponse> {
    const response = await this.get('/3/search/movie', params);

    return {
      movies: response.data.results.map((movie) => this.parseMovie(movie)),
      page: response.data.page,
      totalMovies: response.data.total_results,
      totalPages: response.data.total_pages,
    };
  }
}
