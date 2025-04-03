import { Movie, MovieDetail } from "../types/movie";
import { ApiContract } from "./types";

export class TMDBApi {
  #client: ApiContract;

  constructor(client: ApiContract) {
    this.#client = client;
  }

  popularMovies(page = 1): Promise<{ results: Movie[]; total_pages: number }> {
    return this.#client.get(
      `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular`,
      {
        page,
        language: "ko-KR",
      }
    );
  }

  searchedMovies(
    query: string,
    page = 1
  ): Promise<{ results: Movie[]; total_pages: number }> {
    return this.#client.get(
      `${import.meta.env.VITE_TMDB_BASE_URL}/search/movie`,
      {
        query,
        page,
        include_adult: false,
        language: "ko-KR",
      }
    );
  }

  movieDetail(id: number): Promise<MovieDetail> {
    return this.#client.get(
      `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${id}`,
      {
        language: "ko-KR",
      }
    );
  }
}
