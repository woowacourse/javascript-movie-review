let observer: IntersectionObserver;

const InfiniteScrollService = {
  initObserver(target: HTMLElement, callbackFunc: () => void) {
    observer = new IntersectionObserver(async (entries) => {
      if (!target) this.disconnectObserver();
      if (entries[0].isIntersecting) {
        callbackFunc();
      }
    });
    this.connectObserver(target);
  },

  connectObserver(target: HTMLElement) {
    if (target) observer.observe(target);
  },

  disconnectObserver() {
    observer.disconnect();
  },
};

export default InfiniteScrollService;
