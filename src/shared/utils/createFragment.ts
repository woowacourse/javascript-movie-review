export const createFragment = (items: HTMLElement[]): DocumentFragment => {
  const fragment = document.createDocumentFragment();
  fragment.append(...items);

  return fragment;
};
