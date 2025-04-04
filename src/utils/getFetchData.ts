/// <reference types="vite/client" />

export async function getFetchData<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error("요청이 잘못되었습니다. 입력값을 확인해주세요.");
      case 401:
        throw new Error("인증이 필요합니다. 다시 로그인해주세요.");
      case 403:
        throw new Error("접근 권한이 없습니다.");
      case 404:
        throw new Error("요청한 정보를 찾을 수 없습니다.");
      case 429:
        throw new Error("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
      case 500:
        throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      case 502:
        throw new Error("잘못된 게이트웨이입니다. 다시 시도해주세요.");
      case 503:
        throw new Error("서비스가 일시적으로 중단되었습니다.");
      case 504:
        throw new Error(
          "서버 응답이 지연되고 있습니다. 나중에 다시 시도해주세요."
        );
      default:
        throw new Error(
          `알 수 없는 오류가 발생했습니다. (code: ${response.status})`
        );
    }
  }

  const jsonData = await response.json();
  return jsonData;
}
