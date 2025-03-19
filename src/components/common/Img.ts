import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

type ImgProps = {
  width?: string;
  height?: string;
  src: string;
} & ComponentProps;

export const Img = ({ width, height, src, classList, props }: ImgProps) => {
  const imgProps = {
    width: width || '',
    height: height || '',
    src,
    ...props,
  };

  const imgElement = createElement<HTMLImageElement>('img', imgProps);

  if (classList && classList.length > 0) {
    imgElement.classList.add(...classList);
  }

  return imgElement;
};
