import page from "../../store/page";

export function setupInfiniteScroll({
  onLoad,
  offset = 100,
}: {
  onLoad: () => Promise<void>;
  offset?: number;
}) {
  let isLoading = false;

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const reachedBottom = scrollTop + clientHeight >= scrollHeight - offset;

    if (!reachedBottom || isLoading || !page.hasNextPage()) return;

    isLoading = true;

    onLoad()
      .catch(console.error)
      .finally(() => {
        isLoading = false;

        if (!page.hasNextPage()) {
          const $button = document.querySelector(".primary.more");
          $button?.classList.add("disappear");
        }
      });
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}
