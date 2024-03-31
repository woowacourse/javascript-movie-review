import fetchMoreData from "../model/fetchData";
import { ListType } from "../type/movie";

const handleIntersection = (
  entries: IntersectionObserverEntry[],
  listType: ListType,
) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      fetchMoreData(listType);
    }
  });
};

const createIntersectionObserver = (listType: ListType) => {
  const observer = new IntersectionObserver(
    (entries) => handleIntersection(entries, listType),
    {
      rootMargin: "0px 0px -50px 0px",
    },
  );

  return observer;
};

let previousObserver: IntersectionObserver | null = null;
const addObserver = ($loadMore: HTMLElement, listType: ListType) => {
  if (previousObserver) {
    previousObserver.disconnect();
  }

  const observer = createIntersectionObserver(listType);
  observer.observe($loadMore);

  previousObserver = observer;
};

export default addObserver;
