import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';

type ImgProps = {
  width?: string;
  height?: string;
  src: string;
} & ComponentProps;

export const Img = ({
  width = '200',
  height = '300',
  src,
  classList,
  props,
}: ImgProps) => {
  const imgElement = createElement<HTMLImageElement>('img', {
    width,
    height,
    src,
    ...props,
  });

  if (classList && classList.length > 0) {
    imgElement.classList.add(...classList);
  }

  return imgElement;
};
