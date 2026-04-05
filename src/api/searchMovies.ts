import { OPTIONS } from "../constants/api";

export async function searchMovies(
  page: number,
  query: string,
): Promise<movieResponse | undefined> {
  try {
    const response: Response = await fetch(
      `https://api.themoviedb.org/3/search/movie?language=ko-KR&query=${query}&page=${page}`,
      OPTIONS,
    );

    if (!response.ok) throw new Error("Error");

    const data: movieResponse = await response.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error("Error", e);
    }
  }
}
