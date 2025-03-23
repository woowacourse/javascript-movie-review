interface Props<K extends keyof HTMLElementTagNameMap>
  extends Omit<Partial<HTMLElementTagNameMap[K]>, "className"> {
  className?: string | string[];
}
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Props<K> = {}
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag) as HTMLElementTagNameMap[K];

  for (const [key, value] of Object.entries(props)) {
    if (key === "className") {
      if (Array.isArray(value)) {
        element.classList.add(...value);
      } else if (typeof value === "string") {
        element.classList.add(value);
      }
      continue;
    }

    if (key in element) {
      (element as Record<string, unknown>)[key] = value;
    }
  }

  return element;
}

export function createElementsFragment(
  elements: HTMLElement[]
): DocumentFragment {
  const fragment = document.createDocumentFragment();
  fragment.append(...elements);
  return fragment;
}
