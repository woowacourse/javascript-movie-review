function setupIntersectionObserver(callback, target) {
  const option = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(callback, option);
  observer.observe(target);
}

export default setupIntersectionObserver;
