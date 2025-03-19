import { ComponentProps } from '../../types/Component.types';
import { Button } from './Button';
import { Img } from './Img';

type IconButtonProps = {
  width: string;
  height: string;
  src: string;
  onClick: VoidFunction;
} & ComponentProps;

export const IconButton = ({
  width,
  height,
  src,
  onClick,
  classList,
  props,
}: IconButtonProps) => {
  const buttonProps = { ...props };
  const buttonClasses = ['border-none', ...(classList || [])];

  const iconButtonElement = Button({
    type: 'button',
    onClick,
    classList: buttonClasses,
    props: buttonProps,
  });

  const icon = Img({
    width: width,
    height: height,
    src,
  });

  iconButtonElement.appendChild(icon);

  return iconButtonElement;
};
