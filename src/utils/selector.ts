export const $ = <GenericElement extends Element>(
  selector: keyof HTMLElementTagNameMap | string,
  context: Element | Document = document,
): GenericElement => {
  const $element = context.querySelector<GenericElement>(selector);
  if ($element === null) {
    throw new Error(`"${selector}" 에 해당되는 엘리먼트를 찾을 수 없습니다`);
  }
  return $element;
};

export const $context = (context: Element | Document = document): typeof $ => {
  return (selector: keyof HTMLElementTagNameMap | string) => $(selector, context);
};
