import { timeOutDebounce } from "../utils/debounce";

interface ScrollHandler {
  callback: (() => void) | null;
  handleScroll: ((e: Event) => void) | null;
}

const scrollHandler: ScrollHandler = {
  callback: null,
  handleScroll: null,
};

const useInfiniteScroll = (callback: () => void, threshold = 500) => {
  if (scrollHandler.handleScroll) {
    window.removeEventListener("scroll", scrollHandler.handleScroll);
    scrollHandler.handleScroll = null;
    scrollHandler.callback = null;
  }

  scrollHandler.callback = callback;

  scrollHandler.handleScroll = timeOutDebounce(() => {
    const isBottom =
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - threshold;

    if (isBottom && scrollHandler.callback) {
      scrollHandler.callback();
    }
  }, 500);

  window.addEventListener("scroll", scrollHandler.handleScroll);
};

export default useInfiniteScroll;
