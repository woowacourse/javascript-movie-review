import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

type IconProps = {
  width: number;
  height: number;
  src: string;
} & ComponentProps;

export const Icon = ({ width, height, src, classList, props }: IconProps) => {
  const iconElement = <HTMLImageElement>createElement('img', props);

  iconElement.width = width;
  iconElement.height = height;
  iconElement.src = src;
  classList && iconElement.classList.add(classList.join(' '));

  return iconElement;
};
