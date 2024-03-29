import { $ } from './selector';

function handleElementVisibilityBySelector(target: string, visibility: boolean) {
  const targetElement = $<HTMLElement>(target);

  if (targetElement) targetElement.style.visibility = visibility ? 'visible' : 'hidden';
}

function handleElementVisibilityByElement(targetElement: HTMLElement, visibility: boolean) {
  if (targetElement) targetElement.style.visibility = visibility ? 'visible' : 'hidden';
}

export { handleElementVisibilityBySelector, handleElementVisibilityByElement };
