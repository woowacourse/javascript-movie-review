export const infinityScroll = (fetchData: () => void) => {
  return new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchData();
        observer.unobserve(entry.target);
      }
    });
  }, {});
};
