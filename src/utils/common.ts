export const $ = (selector: string) => document.querySelector(selector);

export const request = async (url: string): Promise<Response> => {
  return await fetch(url);
};
