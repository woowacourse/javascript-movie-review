export const $ = <E extends Element>(
  selector: string,
  baseElement: HTMLElement | Document = document
): E => {
  const element = baseElement.querySelector(selector);

  if (!element) throw new Error('DomError');

  return <E>element;
};
