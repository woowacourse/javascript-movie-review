import { DEVICE_WIDTH } from '../constants/INFORMATION';

const ResizeHandler = {
  mobileViewAddClass(target: HTMLElement, style: string) {
    if (window.innerWidth <= DEVICE_WIDTH.mobileMax) {
      target.classList.add(style);
    } else {
      target.classList.remove(style);
    }
  },

  mobileViewRemoveClass(target: HTMLElement, style: string) {
    if (window.innerWidth <= DEVICE_WIDTH.mobileMax) {
      target.classList.remove(style);
    } else {
      target.classList.add(style);
    }
  },
};

export default ResizeHandler;
