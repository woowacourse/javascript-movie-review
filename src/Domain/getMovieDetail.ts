import { MovieDetail } from "../types/movieDetail";
import { getFetchData } from "../utils/getFetchData";

export async function getMovieDetail(
  movieId: Number
): Promise<MovieDetail | null> {
  try {
    const data = await getFetchData<MovieDetail>(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
    );
    return data;
  } catch (error) {
    return null;
  }
}
