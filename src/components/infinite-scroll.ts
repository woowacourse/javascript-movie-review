interface InfiniteScrollInstance {
  element: HTMLElement;
  disconnect: () => void;
}

export function createInfiniteScroll(
  onIntersect: () => void,
): InfiniteScrollInstance {
  const sentinel = document.createElement("div");

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) onIntersect();
    },
    { threshold: 0.1 },
  );

  observer.observe(sentinel);

  return {
    element: sentinel,
    disconnect: () => observer.disconnect(),
  };
}
