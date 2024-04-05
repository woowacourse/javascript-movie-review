const ScrollUtility = {
  observers: [] as IntersectionObserver[],

  infiniteScroll(scrollTrigger: HTMLElement, onIntersect: () => void) {
    const options = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.isIntersecting && lastEntry.target === scrollTrigger) {
        onIntersect();
      }
    }, options) as IntersectionObserver;

    this.observers.push(observer);

    if (scrollTrigger) observer.observe(scrollTrigger);
  },

  disconnectObserver() {
    this.observers.forEach((observer) => {
      if (observer) {
        observer.disconnect();
      }
    });
    this.observers = [];
  },
};

export default ScrollUtility;
