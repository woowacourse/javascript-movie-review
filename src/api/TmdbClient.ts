import { MovieDetail } from "../../types/movie";
import { API_PATH, BASE_URL, DEFAULT_LANGUAGE } from "../constants/constant";
import {
  ApiError,
  ApiParseError,
  ConfigError,
  NetworkError,
} from "../errors/DomainErrors";
import { MovieListResponse } from "./apiTypes";
import {
  mapMovieDetailResponse,
  mapMovieListResponse,
} from "./movieResponseMapper";

type QueryValue = string | number | boolean;
type QueryParams = Record<string, QueryValue | undefined>;

export class TmdbClient {
  constructor(private readonly apiKey: string) {
    if (!apiKey) {
      throw new ConfigError(
        "VITE_TMDB_API_KEY 환경변수가 설정되지 않았습니다.",
      );
    }
  }

  fetchPopular(page: number): Promise<MovieListResponse> {
    return this.requestJson(API_PATH.POPULAR_MOVIE, { page }).then(
      mapMovieListResponse,
    );
  }

  searchMovies(query: string, page: number): Promise<MovieListResponse> {
    return this.requestJson(API_PATH.SEARCH_MOVIE, {
      query,
      page,
    }).then(mapMovieListResponse);
  }

  fetchMovieDetail(movieId: number): Promise<MovieDetail> {
    return this.requestJson(API_PATH.MOVIE_DETAIL(movieId), {}).then(
      mapMovieDetailResponse,
    );
  }

  private async requestJson(path: string, params: QueryParams): Promise<unknown> {
    const url = this.buildUrl(path, params);

    let response: Response;

    try {
      response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
    } catch (cause) {
      throw new NetworkError("네트워크 요청 실패", cause);
    }

    if (!response.ok) {
      throw new ApiError(response.status, `TMDB API ${response.status}`);
    }

    try {
      return await response.json();
    } catch (cause) {
      throw new ApiParseError("응답 JSON 파싱 실패", cause);
    }
  }

  private buildUrl(path: string, params: QueryParams): URL {
    const url = new URL(`${BASE_URL.TMDB_BASE_URL}${path}`);

    url.searchParams.set("language", DEFAULT_LANGUAGE);
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === "") {
        continue;
      }
      url.searchParams.set(key, String(value));
    }

    return url;
  }
}
