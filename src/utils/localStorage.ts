export const getItemFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);

    if (!item) return defaultValue;

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`로컬 스토리지 데이터 파싱 오류 (${key}):`, error);
    return defaultValue;
  }
};

export const setItemToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`로컬 스토리지 데이터 저장 오류 (${key}):`, error);
  }
};
