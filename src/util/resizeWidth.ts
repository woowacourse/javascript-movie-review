import { resizeMobileWidth } from '../constant/movie';
import { throttleOnRendering } from './throttling';

export const resizeWidth = (func: () => void) => {
  func();
  window.addEventListener(
    'resize',
    throttleOnRendering(() => {
      func();
    }, 300),
  );
};

export const isMobile = () => {
  return window.innerWidth <= resizeMobileWidth;
};
