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
        throw new Error(`HTTP 오류! 상태: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("API 호출 오류:", error);
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
    query: string | undefined,
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
