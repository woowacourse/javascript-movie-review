import { ApiContract } from "./types";

export class TMDBApi {
  private static readonly BASE_URL = "https://api.themoviedb.org/3";

  #client: ApiContract;

  constructor(client: ApiContract) {
    this.#client = client;
  }

  popularMovies(page = 1) {
    return this.#client.get(`${TMDBApi.BASE_URL}/movie/popular`, {
      page,
      language: "ko-KR",
    });
  }

  searchedMovies(query: string, page = 1) {
    return this.#client.get(`${TMDBApi.BASE_URL}/search/movie`, {
      query,
      page,
      include_adult: false,
      language: "ko-KR",
    });
  }
}
