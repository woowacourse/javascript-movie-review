import { fetchUrl } from "../util/fetch";
import { validateResponse } from "../util/validation";
import { TMDBResponse } from "../../types/TMDB";

export async function fetchMovies(
  url: string,
  queryObject: { [key: string]: any },
  options: FetchOptions,
  onError: (error: Error) => void
): Promise<TMDBResponse> {
  try {
    const response = await fetchUrl<TMDBResponse>(url, queryObject, options);
    validateResponse(response);
    return response;
  } catch (error) {
    if (onError) {
      onError(error);
    } else {
      throw error;
    }

    return { results: [], total_pages: 0 };
  }
}
