import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

type IconProps = {
  size: number;
  src: string;
} & ComponentProps;

export const Icon = ({ size, src, classList, props }: IconProps) => {
  const iconElement = <HTMLImageElement>createElement('img', props);

  iconElement.width = size;
  iconElement.height = size;
  iconElement.src = src;
  classList && iconElement.classList.add(classList.join(' '));

  return iconElement;
};
