type HTMLTagName = keyof HTMLElementTagNameMap

export const getElement = (selector: string) =>document.querySelector(selector) as HTMLElement;
  
export const createElement = (tag: HTMLTagName) => document.createElement(tag)
