const ScrollController = {
  allowScroll() {
    document.body.style.overflow = 'auto';
  },

  preventScroll() {
    document.body.style.overflow = 'hidden';
  },
};

export default ScrollController;
