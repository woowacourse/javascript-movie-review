import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

import { Icon } from './Icon';

type IconButtonProps = {
  src: string;
  onClick: VoidFunction;
} & ComponentProps;

export const IconButton = ({
  src,
  onClick,
  classList,
  props,
}: IconButtonProps) => {
  const iconButtonElement = <HTMLButtonElement>createElement('button', {
    type: 'button',
  });

  const icon = Icon({
    size: 24,
    src: src,
    classList: classList,
    props: props,
  });

  iconButtonElement.classList.add('border-none');
  iconButtonElement.appendChild(icon);

  iconButtonElement.addEventListener('click', () => {
    onClick();
  });

  return iconButtonElement;
};
