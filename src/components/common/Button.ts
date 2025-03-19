import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  onClick: VoidFunction;
} & ComponentProps;

export const Button = ({ type, onClick, classList, props }: ButtonProps) => {
  const buttonElement = createElement<HTMLButtonElement>('button', props);

  buttonElement.type = type;

  if (classList && classList.length > 0) {
    buttonElement.classList.add(...classList);
  }

  if (onClick) {
    buttonElement.addEventListener('click', onClick);
  }

  return buttonElement;
};
