import { $ } from './selector';

function handleElementDisplayBySelector(target: string, isDisplay: boolean) {
  const targetElement = $<HTMLElement>(target);

  if (targetElement) targetElement.style.display = isDisplay ? 'block' : 'none';
}

function handleElementDisplayByElement(targetElement: HTMLElement, isDisplay: boolean) {
  if (targetElement) targetElement.style.display = isDisplay ? 'block' : 'none';
}

export { handleElementDisplayBySelector, handleElementDisplayByElement };
