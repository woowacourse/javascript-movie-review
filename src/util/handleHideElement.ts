import { $ } from './selector';

function handleElementDisplayBySelector(target: string, isDisplay: boolean) {
  const targetElement = $<HTMLElement>(target);

  if (targetElement) {
    if (isDisplay) targetElement.classList.remove('none-display');
    else targetElement.classList.add('none-display');
  }
}

function handleElementDisplayByElement(targetElement: HTMLElement, isDisplay: boolean) {
  if (targetElement) {
    if (isDisplay) targetElement.classList.remove('none-display');
    else targetElement.classList.add('none-display');
  }
}

export { handleElementDisplayBySelector, handleElementDisplayByElement };
