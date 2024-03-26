import { OPTION } from '../constants/InfiniteScrollOption';

async function setupInfiniteScroll(
  listEnd: HTMLElement,
  mountItems: (listEnd: HTMLElement, search?: string) => Promise<void>,
  search?: string,
) {
  const onIntersect: IntersectionObserverCallback = async (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await mountItems(listEnd, search);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, OPTION);
  observer.observe(listEnd);
}

export default setupInfiniteScroll;
