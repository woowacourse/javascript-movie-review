const createObserver = (callback: () => void) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) callback();
      });
    },
    { rootMargin: '0px 0px 500px 0px' }
  );
};

export default createObserver;
