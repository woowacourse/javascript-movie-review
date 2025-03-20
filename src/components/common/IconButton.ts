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
  return Button({
    type: 'button',
    onClick,
    classList: ['border-none', ...(classList || [])],
    props: {
      ...props,
      children: [Img({ width, height, src })],
    },
  });
};
