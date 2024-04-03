const InfiniteScrollService = {
  initObserver(target: HTMLElement, callbackFunc: () => void) {
    const observer = new IntersectionObserver((entries) => {
      if (!target) this.disconnectObserver(observer);

      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          callbackFunc();
        }
      });
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
