import Toast from "../components/Toast/Toast";
import { ERROR_MESSAGE } from "../setting/ErrorMessage";
import showFallback from "../components/fallback/shwoFallback";

export default async function fetchErrorHandler<T>(
  fetch: () => Promise<T>
): Promise<T> {
  try {
    const response = await fetch();

    if (!response) {
      Toast.showToast(ERROR_MESSAGE.FETCH_ERROR, "error", 5000);
      throw new Error(ERROR_MESSAGE.FETCH_ERROR);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      Toast.showToast(error.message, "error", 5000);
    }
    showFallback("에러가 발생했습니다. 다시 시도해주세요.");
    throw error;
  }
}
