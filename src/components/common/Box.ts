import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

export const Box = ({ classList, props }: ComponentProps) => {
  const boxElement = createElement<HTMLDivElement>('div', props);

  if (classList && classList.length > 0) {
    boxElement.classList.add(...classList);
  }

  return boxElement;
};
