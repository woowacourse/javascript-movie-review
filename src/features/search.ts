import { fetchSearchMovies } from "../api/movieApi";
import { createMovieList } from "../components/movie";
import { createSkeleton } from "../components/skeleton";
import { setupInfiniteScroll } from "./infiniteScroll";

export const handleSearch = async (
  query: string,
  mainEl: Element,
  titleEl: Element,
  onMovieClick: (id: number) => void,
): Promise<() => void> => {
  updateSearchUrl(query);

  titleEl.textContent = `"${query}" 검색 결과`;
  mainEl.innerHTML = "";
  mainEl.appendChild(titleEl);

  const skeleton = createSkeleton();
  mainEl.appendChild(skeleton);

  let page = 1;
  const data = await fetchSearchMovies(query, page);
  skeleton.remove();

  if (data.results.length === 0) {
    const noResultEl = document.createElement("p");
    noResultEl.className = "no-search-result";
    noResultEl.textContent = "검색 결과가 없습니다.";
    mainEl.appendChild(noResultEl);
    return () => {};
  }

  mainEl.appendChild(createMovieList(data.results, onMovieClick));

  if (data.total_pages <= page) return () => {};

  let stop = () => {};
  stop = setupInfiniteScroll(mainEl, async () => {
    page++;
    const moreSkeleton = createSkeleton();
    mainEl.appendChild(moreSkeleton);

    const nextData = await fetchSearchMovies(query, page);
    moreSkeleton.replaceWith(createMovieList(nextData.results, onMovieClick));

    if (nextData.total_pages <= page) stop();
  });

  return stop;
};

const updateSearchUrl = (query: string) => {
  const params = new URLSearchParams();
  params.set("query", query);
  history.pushState({}, "", `/search?${params.toString()}`);
};
