export const createScrollObserver = (
  targetElement: HTMLElement,
  onIntersect: () => void,
) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });
  });

  observer.observe(targetElement);

  return () => observer.disconnect();
};
