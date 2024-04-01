export const $ = (query: string) => {
  return document.querySelector(query);
};

export const $$ = (query: string) => {
  return document.querySelectorAll(query);
};
