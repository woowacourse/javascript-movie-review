export const $ = (selector: string) => document.querySelector(selector);

export const request = async (url: string): Promise<Response> => {
  const response = await fetch(url);

  if (response.ok) {
    return response;
  }

  throw new Error('404 불러올 수 없습니다.');
};
