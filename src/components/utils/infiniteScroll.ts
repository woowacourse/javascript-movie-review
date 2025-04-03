export function setupInfiniteScroll({
  onLoad,
  onEnd,
  hasNextPage,
  offset = 100,
}: {
  onLoad: () => Promise<void>;
  onEnd?: () => void;
  hasNextPage: () => boolean;
  offset?: number;
}) {
  let isLoading = false;

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const reachedBottom = scrollTop + clientHeight >= scrollHeight - offset;

    if (!reachedBottom || isLoading || !hasNextPage()) return;

    isLoading = true;

    onLoad()
      .catch(console.error)
      .finally(() => {
        isLoading = false;

        if (!hasNextPage()) {
          onEnd?.();
        }
      });
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}
