export const $ = <
  GenericElement extends Element,
  Selector extends string =
    | `${keyof HTMLElementTagNameMap | string}`
    | `${keyof HTMLElementTagNameMap | string}?`,
>(
  selector: Selector,
  context: Element | Document = document,
): Selector extends `${string}?` ? GenericElement | null : GenericElement => {
  const $element = context.querySelector<GenericElement>(
    selector.endsWith('?') ? selector.slice(0, -1) : selector,
  );
  if ($element === null && !selector.endsWith('?')) {
    throw new Error(`"${selector}" 에 해당되는 엘리먼트를 찾을 수 없습니다`);
  }
  return $element!;
};

export const $context = (context: Element | Document = document): typeof $ => {
  return (selector: keyof HTMLElementTagNameMap | string) => $(selector, context);
};
