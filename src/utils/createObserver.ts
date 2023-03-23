const createObserver = (callback: () => void, threshold = 0.5) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) callback();
      });
    },
    { threshold }
  );
};

export default createObserver;
