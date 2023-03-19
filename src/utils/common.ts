export const $ = (selector: string) => document.querySelector(selector);

export const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  throw new Error('404 불러올 수 없습니다.');
};
