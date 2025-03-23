import ApiClient from "./ApiClient";

interface GetAllRequest {
  page: number;
}

interface GetRequest {
  page: number;
  query: string;
}

export default class MovieApiClient {
  static #ORIGIN = "https://api.themoviedb.org";
  static #OPTIONS = {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
  };

  static async getAll({ page }: GetAllRequest) {
    const url = new URL("/3/movie/popular", this.#ORIGIN);
    url.searchParams.append("page", String(page));
    url.searchParams.append("language", "ko-KR");

    return ApiClient.get(url, this.#OPTIONS);
  }

  static get({ query, page }: GetRequest) {
    const url = new URL("/3/search/movie", this.#ORIGIN);
    url.searchParams.append("page", String(page));
    url.searchParams.append("language", "ko-KR");
    url.searchParams.append("query", query);

    return ApiClient.get(this.#ORIGIN, this.#OPTIONS);
  }
}
