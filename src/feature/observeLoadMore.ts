import { Response } from "../../types/response";
import { $ } from "../utils/dom";
import loadMoreMovies from "../components/utils/loadMoreMovies";

type Props = {
  loadFn: (currentPage: number) => Promise<Response>;
};
const observeLoadMore = ({ loadFn }: Props) => {
  let currentPage = 2;
  const listEnd = $(".load-more");

  const option = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    thredhold: 0,
  };

  const onIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadMoreMovies({ loadFn: () => loadFn(currentPage) });
        currentPage++;
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, option);
  observer.observe(listEnd);
};

export default observeLoadMore;
