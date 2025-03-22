import { ERROR_MESSAGE } from "../setting/ErrorMessage";
import type { TMDBResponse } from "../../types/TMDB";

export function validateResponse(response: TMDBResponse): void {
  if (!response || !response.results) {
    throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
  if (response.results.length === 0) {
    throw new Error(ERROR_MESSAGE.NO_DATA);
  }
}
