import { ComponentProps } from '../../types/Component.types.ts';
import { createElement } from '../../utils/createElement.ts';

export const Text = ({ classList, props }: ComponentProps) => {
  const textElement = <HTMLParagraphElement>createElement('p', props);
  textElement.classList.add(classList.join(' '));

  return textElement;
};
