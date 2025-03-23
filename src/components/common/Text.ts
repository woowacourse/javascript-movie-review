import { ComponentProps } from '../../types/Component.types.ts';
import { createElement } from '../../utils/createElement.ts';

export const Text = ({ classList, props }: ComponentProps) => {
  const textElement = <HTMLParagraphElement>createElement('p', props);

  if (classList && classList.length > 0) {
    textElement.classList.add(...classList);
  }

  return textElement;
};
