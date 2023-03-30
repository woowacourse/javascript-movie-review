import { debounce } from './delayHelper';

const options = {
  threshold: 1, // 50%가 viewport에 들어와 있어야 callback 실행
};

export const scrollHook = (fn: VoidFunction) => {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        debounce(() => fn(), 900)();
      }
    });
  }, options);
};
