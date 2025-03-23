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

export class TmdbApiError extends Error {
  statusCode: number;
  apiErrorCode: number;

  constructor(message: string, statusCode: number, apiErrorCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.apiErrorCode = apiErrorCode;
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
    params: Record<string, string>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    url.searchParams.append("language", "ko-KR");

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const option = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.apiToken}`,
        },
      }
      const response = await fetch(url.toString(), option);
      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.status_message || "알수없는 오류가 발생했습니다.";
        switch (response.status) {
          case 401:
            console.error(`인증 오류: ${errorData.status_code} - ${errorData.status_message}`);
            errorMessage = '서비스에 접속할 수 없습니다. 잠시 후 다시 시도하거나 관리자에게 문의하세요.';
            break;
          case 404:
            errorMessage = '요청한 리소스를 찾을 수 없습니다.';
            break;
          case 429:
            errorMessage = '요청 횟수가 제한을 초과했습니다. 잠시 후 다시 시도해주세요.';
            break;
          case 503:
            errorMessage = '서비스가 일시적으로 오프라인 상태입니다. 나중에 다시 시도해주세요.';
            break;
          case 500:
          case 502:
          case 504:
            errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
            break;
        }
        throw new TmdbApiError(errorMessage, response.status, errorData.status_code);
      }
      return response.json();
    } catch (error) {
      if (error instanceof TmdbApiError) {
        throw error;
      } else {
        console.error("API 호출 오류:", error);
        throw new TmdbApiError(
          '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
          0,
          0
        );
      }
      throw error;
    }
  }

  async popularMovies(page: number = 1): Promise<APIResponse<MovieResponse>> {
    const endpoint = "/movie/popular";
    const params = {
      page: page.toString(),
    };
    return this.fetchData<APIResponse<MovieResponse>>(endpoint, params);
  }

  async searchMovies(
    query?: string,
    page: number = 1
  ): Promise<APIResponse<MovieResponse>> {
    const endpoint = "/search/movie";
    const params = {
      query: query || "",
      page: page.toString(),
    };
    return this.fetchData<APIResponse<MovieResponse>>(endpoint, params);
  }
}
