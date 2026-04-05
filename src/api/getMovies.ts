import { OPTIONS } from "../constants/api";

export async function getMovies(
  page: number,
): Promise<MovieResponse | undefined> {
  try {
    const response: Response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
      OPTIONS,
    );

    if (!response.ok) throw new Error("Error");

    const data: MovieResponse = await response.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error("Error", e);
    }
  }
}
