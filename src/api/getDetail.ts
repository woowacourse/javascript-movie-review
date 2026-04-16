import { OPTIONS } from "../constants/api";
import { ResponseError } from "../error/responseError";

export async function getDetail(id: number): Promise<MovieItem> {
  try {
    const response: Response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ko-KR&region=KR`,
      OPTIONS,
    );

    if (!response.ok) {
      throw new ResponseError("[Error]: API 에러", "HTTP", response.status);
    }

    const data: MovieItem = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ResponseError) {
      throw error;
    }

    throw new ResponseError("[Error]: 네트워크 에러", "NETWORK");
  }
}
