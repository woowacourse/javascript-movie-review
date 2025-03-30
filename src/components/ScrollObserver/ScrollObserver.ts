import { noop } from "@zoeykr/function-al";
import { $observerTarget } from "./Element";

const ScrollObserver = {
  get() {
    const option: IntersectionObserverInit = {
      threshold: 0.5,
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

  turnOn(observer: IntersectionObserver) {
    observer.observe($observerTarget);
  },

  turnOff(observer: IntersectionObserver) {
    observer.unobserve($observerTarget);
  },

  intersect() {
    noop();
  },
};

export default ScrollObserver;
