export const bindObserver = ($target: Element, callback: () => void) => {
  const options = {
    threshold: 1.0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
      }
    });
  }, options);

  observer.observe($target);
};
