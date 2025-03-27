import { fetchUrl } from "../util/fetch";
import { validateResponse } from "../util/validation";
import type { TMDBResponse } from "../../types/tmdb.types";
import type { FetchOptions } from "../../types/fetch.types";

export async function fetchMovies(
  url: string,
  queryObject: { [key: string]: string },
  options: FetchOptions,
  onError: (error: Error) => void,
  path?: string
): Promise<TMDBResponse> {
  try {
    const response = await fetchUrl<TMDBResponse>(
      url,
      new URLSearchParams(queryObject),
      options,
      path
    );
    validateResponse(response);
    return response;
  } catch (error) {
    if (onError) {
      onError(error as Error);
    } else {
      throw error;
    }

    return { id: -1, results: [], total_pages: 0, page: 1, total_results: 0 };
  }
}
