import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

export const Horizon = ({ classList, props }: ComponentProps) => {
  const hrElement = createElement<HTMLDivElement>('hr', props);

  if (classList && classList.length > 0) {
    hrElement.classList.add(...classList);
  }

  return hrElement;
};
