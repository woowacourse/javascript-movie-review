import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  height?: string;
  onClick: (event: MouseEvent) => void;
} & ComponentProps;

export const Button = ({
  type = 'button',
  height = '36',
  onClick,
  classList,
  props,
}: ButtonProps) => {
  const buttonElement = createElement<HTMLButtonElement>('button', {
    type,
    ...props,
  });

  if (classList && classList.length > 0) {
    buttonElement.classList.add(...classList);
  }

  if (height) {
    buttonElement.style.height = `${height}px`;
  }

  buttonElement.addEventListener('click', onClick);

  return buttonElement;
};
