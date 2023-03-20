export const $ = <E extends Element>(selector: string): E | null => document.querySelector(selector);

export const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  throw new Error('404 불러올 수 없습니다.');
};

export const createUniqueId = () => {
  return 'id' + Math.random().toString(16).slice(2);
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};
