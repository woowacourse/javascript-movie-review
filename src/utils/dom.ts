export const createElement = <T>(selector: string) => document.createElement(selector) as T;

// export const $ = <T extends Element>() => document.querySelector as T;

export const $ = <E extends Element>(selector: string): E | null => {
  return document.querySelector(selector);
};
