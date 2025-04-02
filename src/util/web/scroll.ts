type ObserveScrollEndOptions = {
  target: HTMLElement;
  callback: () => void;
  threshold?: number;
};

export function observeScrollEnd({ target, callback, threshold }: ObserveScrollEndOptions) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    },
    {
      root: null,
      threshold,
    },
  );

  observer.observe(target);
  return () => observer.disconnect();
}
