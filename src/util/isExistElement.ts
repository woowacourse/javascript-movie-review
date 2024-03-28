import { $ } from './selector';

function isExistElement<T extends HTMLElement = HTMLElement>(
  target: string,
  startDOM: HTMLElement = document.body,
): boolean | HTMLElement {
  try {
    const targetElement = $<T>(target, startDOM);
    return targetElement;
  } catch (error) {
    return false;
  }
}

export default isExistElement;
