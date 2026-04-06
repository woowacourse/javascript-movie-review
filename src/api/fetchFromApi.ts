import { OPTIONS } from "../constants/api";
import { API_COMMON_URL } from "../constants/api";

function validateToken() {
  if (OPTIONS.headers.Authorization === "Bearer undefined") throw new Error("토큰 인증 오류가 발생했습니다. 토큰을 확인해주세요.");
}

export async function fetchFromApi<T>(url: string): Promise<ApiResult<T>> {
  try {
    validateToken();
    const response: Response = await fetch(
      `${API_COMMON_URL}${url}`,
      OPTIONS,
    );

    if (!response.ok) throw new Error(`영화 목록 조회 실패: ${response.status} ${response.statusText}`);

    const data: T = await response.json();
    return { success: true, data: data };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.";
    return { success: false, error: errorMessage };
  }
}
