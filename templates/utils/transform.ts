import { movieGenre } from "../../types/movieType";

export function adaptMovieData<T extends { genres?: movieGenre[] }>(
  data: T
): T & { movieGenres?: movieGenre[] } {
  if ("genres" in data && data.genres !== undefined) {
    const movieGenres = data.genres;
    const { genres, ...rest } = data;
    return { ...rest, movieGenres } as T & { movieGenres?: movieGenre[] };
  }
  return data as T & { movieGenres?: movieGenre[] };
}
