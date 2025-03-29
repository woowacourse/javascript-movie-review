import {
  API_ERROR_MESSAGES,
  DEFAULT_ERROR_MESSAGE,
} from '../constants/errorMessages';

export interface APIResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponse {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  video: boolean;
  original_language: string;
}

export interface MovieDetailResponse {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  imdb_id: string | null;
  original_language: string;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
  video: boolean;
  belongs_to_collection: any | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
}
export class TmdbApiError extends Error {
  statusCode: number;
  apiErrorCode: number;
  name: string;

  constructor(message: string, statusCode: number, apiErrorCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.apiErrorCode = apiErrorCode;
    this.name = 'TmdbApiError';
  }
}

export default class TmdbApi {
  private apiToken: string;
  private baseUrl: string;

  constructor(apiToken: string, baseUrl: string) {
    this.apiToken = apiToken;
    this.baseUrl = baseUrl;
  }

  async fetchData<T>(
    endpoint: string,
    params: Record<string, string>,
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    url.searchParams.append('language', 'ko-KR');

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const option = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.apiToken}`,
      },
    };
    try {
      const response = await fetch(url.toString(), option);
      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401) {
          console.error(
            `인증 오류: ${errorData.status_code} - ${errorData.status_message}`,
          );
        }

        const errorMessage =
          API_ERROR_MESSAGES[response.status] ||
          errorData.status_message ||
          DEFAULT_ERROR_MESSAGE;

        throw new TmdbApiError(
          errorMessage,
          response.status,
          errorData.status_code,
        );
      }
      return response.json();
    } catch (error) {
      if (error instanceof TmdbApiError) {
        throw error;
      }
      throw error;
    }
  }

  async popularMovies(page: number = 1): Promise<APIResponse<MovieResponse>> {
    const endpoint = '/movie/popular';
    const params = {
      page: page.toString(),
    };
    return this.fetchData<APIResponse<MovieResponse>>(endpoint, params);
  }

  async searchMovies(
    query?: string,
    page: number = 1,
  ): Promise<APIResponse<MovieResponse>> {
    const endpoint = '/search/movie';
    const params = {
      query: query || '',
      page: page.toString(),
    };
    return this.fetchData<APIResponse<MovieResponse>>(endpoint, params);
  }

  async getMovieDetail(
    movieId: number,
    appendToResponse?: string,
  ): Promise<MovieDetailResponse> {
    const endpoint = `/movie/${movieId}`;
    const params: Record<string, string> = {};

    if (appendToResponse) {
      params.append_to_response = appendToResponse;
    }

    return this.fetchData<MovieDetailResponse>(endpoint, params);
  }
}
