const InfiniteScrollService = {
  initObserver(target: HTMLElement, callbackFunc: () => void) {
    const observer = new IntersectionObserver(async (entries) => {
      if (!target) this.disconnectObserver(observer);
      if (entries[0].isIntersecting) {
        callbackFunc();
      }
    });
    this.connectObserver(target, observer);
  },

  connectObserver(target: HTMLElement, observer: IntersectionObserver) {
    if (target) observer.observe(target);
  },

  disconnectObserver(observer: IntersectionObserver) {
    observer.disconnect();
  },
};

export default InfiniteScrollService;
