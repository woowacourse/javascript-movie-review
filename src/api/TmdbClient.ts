import { ApiError, ApiParseError, ConfigError, NetworkError } from "../errors/DomainErrors";
import { createMovieApiUrl, createRequestOptions, mapFetchMoviePageDataResponse } from "./apiBuilder";
import { FetchMoviePageDataResponse } from "./apiTypes";

export class TmdbClient {
  constructor(private readonly apiKey: string) {
    if (!apiKey) {
      throw new ConfigError("VITE_TMDB_API_KEY 환경변수가 설정되지 않았습니다.");
    }
  }

  fetchPopular(page: number): Promise<FetchMoviePageDataResponse> {
    return this.request(page, "");
  }

  searchMovies(query: string, page: number): Promise<FetchMoviePageDataResponse> {
    return this.request(page, query);
  }

  private async request(page: number, query: string): Promise<FetchMoviePageDataResponse> {
    let response: Response;
    try {
      response = await fetch(createMovieApiUrl(page, query), createRequestOptions());
    } catch (cause) {
      throw new NetworkError("네트워크 요청 실패", cause);
    }

    if (!response.ok) {
      throw new ApiError(response.status, `TMDB API ${response.status}`);
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (cause) {
      throw new ApiParseError("응답 JSON 파싱 실패", cause);
    }

    return mapFetchMoviePageDataResponse(json);
  }
}
