const isQuotaExceededError = (err: unknown): boolean => {
  return (
    err instanceof DOMException &&
    (err.code === 22 ||
      err.code === 1014 ||
      err.name === "QuotaExceededError" ||
      err.name === "NS_ERROR_DOM_QUOTA_REACHED")
  );
};

export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    if (isQuotaExceededError(err)) {
      alert("현재 사용 가능한 스토리지 공간이 부족합니다.");
    } else {
      alert("예기치 못한 오류가 발생했습니다.");
    }
  }
};

export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) return defaultValue;

    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export const MOVIE_REVIEW = "movieReview";
