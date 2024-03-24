import CircleErrorImg from '../../images/circle-exclamation.svg';
import TriangleErrorImg from '../../images/triangle_exclamation.svg';
import { createElementWithAttribute } from '../../utils';

export type ErrorImgType = 'triangle' | 'circle';

const ERROR_IMG_URL: { [key in ErrorImgType]: string } = {
  circle: CircleErrorImg,
  triangle: TriangleErrorImg,
};

class ErrorImg {
  #element: HTMLImageElement;

  constructor(type: ErrorImgType) {
    this.#element = this.#makeImage(type);
  }

  get element() {
    return this.#element;
  }

  #makeImage(type: ErrorImgType) {
    return createElementWithAttribute('img', {
      class: 'error-img',
      src: ERROR_IMG_URL[type],
    }) as HTMLImageElement;
  }
}

export default ErrorImg;
