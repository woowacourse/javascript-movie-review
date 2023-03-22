export const $ = <E extends Element>(selector: string): E | null => document.querySelector(selector);

export const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('정보를 불러올 수 없습니다.');
  }

  return response.json();
};

export const createUniqueId = () => {
  return 'id' + Math.random().toString(16).slice(2);
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};
