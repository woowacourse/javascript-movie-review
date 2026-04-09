import { ApiError } from "../services/api";

export const showError = (error: unknown) => {
  if (error instanceof ApiError && error.status_code === 22) {
    alert("잘못된 페이지 요청입니다.");
    return;
  }

  alert("영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
};
