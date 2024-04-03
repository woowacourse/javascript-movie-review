const ScrollUtility = {
  observer: null as IntersectionObserver | null,

  infiniteScroll(scrollTrigger: HTMLElement, onIntersect: () => void) {
    const options = {
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.isIntersecting && lastEntry.target === scrollTrigger) {
        onIntersect();
      }
    }, options);

    if (scrollTrigger) this.observer.observe(scrollTrigger);
  },

  disconnectObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  },
};

export default ScrollUtility;
