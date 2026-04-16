export const reserveIntersectionHandler = (
  elem: HTMLElement,
  callback: (entry: Partial<IntersectionObserverEntry>) => void,
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        callback(entry);
      });
    },
    { threshold: 0 },
  );

  observer.observe(elem);

  return observer.disconnect.bind(observer);
};
