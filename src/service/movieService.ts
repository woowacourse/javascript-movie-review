import { fetchUrl } from "../util/fetch";
import { validateResponse } from "../util/validation";
import type { TMDBResponse } from "../../types/TMDB";

export async function fetchMovies(
  url: string,
  queryObject: { [key: string]: string },
  options: FetchOptions,
  onError: (error: Error) => void
): Promise<TMDBResponse> {
  try {
    const response = await fetchUrl<TMDBResponse>(
      url,
      new URLSearchParams(queryObject),
      options
    );
    validateResponse(response);
    return response;
  } catch (error) {
    if (onError) {
      onError(error as Error);
    } else {
      throw error;
    }

    return { results: [], total_pages: 0, page: 1, total_results: 0 };
  }
}
