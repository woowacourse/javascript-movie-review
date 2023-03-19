import { FetchUrl } from "./utils/constants";

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const message = onHandleStatusError(response.status);
      throw new Error(message);
    }
  } catch (err) {
    if (err instanceof Error) {
      const message = onHandleCatchError(err.message);
      throw new Error(message);
    }
  }
};

function onHandleStatusError(status: number) {
  switch (status) {
    case 400:
      return "잘못된 요청입니다.";
    case 401:
      return "인증되지 않은 요청입니다.";
    case 403:
      return "접근 권한이 없습니다.";
    case 404:
      return "요청한 리소스를 찾을 수 없습니다.";
    case 500:
      return "서버 내부 오류가 발생했습니다.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
}

function onHandleCatchError(error: string) {
  switch (error) {
    case "undefined":
      return "영화 목록을 받아올 수 없습니다";
  }
}

export const mostPopular = async (pageNumber: number) => {
  const url = `${FetchUrl.POPULAR_URL}${pageNumber}`;
  return await fetchData(url);
};

export const search = async (query: string, pageNumber: number) => {
  const url = `${FetchUrl.SEARCH_URL}${query}&page=${pageNumber}&include_adult=false`;
  return await fetchData(url);
};
