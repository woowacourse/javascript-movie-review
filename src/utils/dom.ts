import { HTMLTagName } from "../../types/type";

export const createElement = <T extends HTMLTagName>(
  tag: T,
  props: Partial<HTMLElementTagNameMap[T]> = {}
): HTMLElement => {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (key === "className") {
      Array.isArray(value)
        ? element.classList.add(...value)
        : element.classList.add(value);

      continue;
    }

    (element as any)[key] = value;
  }

  return element;
};

export const wrapFragment = (children: HTMLElement[]): DocumentFragment => {
  const fragment = document.createDocumentFragment();
  fragment.append(...children);
  return fragment;
};
