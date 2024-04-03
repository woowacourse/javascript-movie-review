const ResizeHandler = {
  mobileViewAddClass(target: HTMLElement, style: string) {
    if (window.innerWidth <= 767) {
      target.classList.add(style);
    } else {
      target.classList.remove(style);
    }
  },

  mobileViewRemoveClass(target: HTMLElement, style: string) {
    if (window.innerWidth <= 767) {
      target.classList.remove(style);
    } else {
      target.classList.add(style);
    }
  },
};

export default ResizeHandler;
