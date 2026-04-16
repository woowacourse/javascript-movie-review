export type InfiniteScrollController = ReturnType<typeof createInfiniteScrollController>;

function setupInfiniteScroll(
  container: Element,
  onLoadMore: () => Promise<void>,
): () => void {
  const trigger = document.createElement("div");
  container.appendChild(trigger);
  let isLoading = false;

  const observer = new IntersectionObserver(async ([entry]) => {
    if (!entry.isIntersecting || isLoading) return;
    isLoading = true;
    await onLoadMore();
    container.appendChild(trigger);
    isLoading = false;
  });

  observer.observe(trigger);

  return () => {
    observer.disconnect();
    trigger.remove();
  };
}

export function createInfiniteScrollController() {
  let cleanup: () => void = () => {};

  return {
    start(container: Element, onLoadMore: () => Promise<void>) {
      this.stop();
      cleanup = setupInfiniteScroll(container, onLoadMore);
    },
    stop() {
      cleanup();
      cleanup = () => {};
    },
  };
}
