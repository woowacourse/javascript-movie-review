export const observeIntersection = (target: HTMLElement, callback: () => void) => {
  const observer = new IntersectionObserver((entries) => {
    const isElementVisible = entries[0].isIntersecting;
    if (isElementVisible) {
      callback();
    }
  });
  observer.observe(target);
}
