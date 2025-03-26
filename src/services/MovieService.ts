import { QueryParams } from "../../types/apiType";
import { getApiOptions } from "../apis/config";

class MovieService {
  currentPage: number;
  baseUrl: string;

  constructor() {
    this.currentPage = 1;
    this.baseUrl = import.meta.env.VITE_REQUEST_URL;
  }

  async fetchMovies(endPoint: string, queryParams: QueryParams) {
  const queryString = new URLSearchParams(
    Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    ).toString();
    const url = `${this.baseUrl}${endPoint}?${queryString}`;
    const response = await fetch(
      url,
      getApiOptions(import.meta.env.VITE_TMDB_API_KEY)
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }

    if (response.status === 500) {
      alert("데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요😅");
    }

    return [];
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}

export default MovieService;
