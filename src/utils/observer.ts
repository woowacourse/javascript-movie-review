export const setIntersectionObserver = (callback: () => Promise<void>) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
      }
    });
  });
  return observer;
};

export const connectObserver = (observer: IntersectionObserver, target: HTMLElement) => {
  observer.observe(target);
};

export const disconnectObserver = (observer: IntersectionObserver) => {
  observer.disconnect();
};
