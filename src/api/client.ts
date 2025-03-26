import { BaseApiResponse } from "../../types/api";

export async function fetchWithErrorHandling<T>(
  url: string
): Promise<BaseApiResponse<T>> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      switch (response.status) {
        case 400:
          return {
            error: "검색 가능한 페이지 수를 넘겼습니다.",
          };
        case 401:
          return {
            error: "사용자 인증 정보가 잘못되었습니다.",
          };
        default:
          return {
            error: `에러가 발생했습니다. (${response.status})`,
          };
      }
    }

    return response.json();
  } catch (error) {
    return {
      error: `에러가 발생했습니다. ${error}`,
    };
  }
}
