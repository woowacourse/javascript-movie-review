import { API_KEY, BASE_URL } from "../../constants/constant";
import { MovieResponse } from "../../../types/types";

export async function fetchMoviesApi(
  path: string,
  page: number,
  params: string = "",
): Promise<MovieResponse> {
  const queryUrl: string =
    params === "" ? "" : `&query=${encodeURIComponent(params)}`;

  try {
    const response = await fetch(
      `${BASE_URL}/${path}?api_key=${API_KEY}${queryUrl}&language=ko-KR&page=${page}`,
    );
    if (!response.ok) {
      throw new Error(`${response.status} 영화 정보를 불러오지 못했습니다.`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("네트워크 연결을 확인해주세요.");
    }
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}
