import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  onClick: VoidFunction;
} & ComponentProps;

export const Button = ({ type, onClick, classList, props }: ButtonProps) => {
  const buttonElement = <HTMLButtonElement>createElement('button', props);

  buttonElement.type = type;

  classList?.forEach((classes) => {
    buttonElement.classList.add(classes);
  });

  buttonElement.addEventListener('click', () => {
    onClick();
  });

  return buttonElement;
};
