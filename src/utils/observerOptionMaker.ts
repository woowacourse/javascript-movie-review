const observerOptionMaker = (rootMargin: string, threshold: number): IntersectionObserverInit => {
  return {
    rootMargin,
    threshold,
  };
};

export default observerOptionMaker;
