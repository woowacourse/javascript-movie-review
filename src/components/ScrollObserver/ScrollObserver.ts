import { $observerTarget } from "./Element";

const ScrollObserver = {
  get() {
    const option: IntersectionObserverInit = {
      threshold: 1,
    };

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        this.intersect();
      });
    };

    const observer = new IntersectionObserver(onIntersect, option);
    return observer;
  },

  on(observer: IntersectionObserver) {
    observer.observe($observerTarget);
  },

  off(observer: IntersectionObserver) {
    observer.unobserve($observerTarget);
  },

  intersect() {
    console.log("ScrollObserver 감지");
  },
};

export default ScrollObserver;
