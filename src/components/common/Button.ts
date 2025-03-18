import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  onClick: VoidFunction;
} & ComponentProps;

export const Button = ({ type, onClick, classList, props }: ButtonProps) => {
  const buttonElement = <HTMLButtonElement>createElement('button', props);

  buttonElement.type = type;
  buttonElement.classList.add(classList.join(' '));

  buttonElement.addEventListener('click', () => {
    onClick();
  });

  return buttonElement;
};
