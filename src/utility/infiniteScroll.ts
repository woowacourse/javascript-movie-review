const ScrollUtility = {
  observer: null as IntersectionObserver | null,

  infiniteScroll(target: HTMLElement, onIntersect: () => void) {
    const options = {
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.isIntersecting && lastEntry.target === target) {
        onIntersect();
      }
    }, options);

    if (target) this.observer.observe(target);
  },

  disconnectObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  },
};

export default ScrollUtility;
