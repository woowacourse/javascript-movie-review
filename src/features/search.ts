import { fetchSearchMovies } from "../api/movieApi";
import { Movie } from "../api/api";
import { createMovieList } from "../components/movie";
import { hideLoadMoreButton, handleLoadMoreButton } from "./movieRenderer";

export const handleSearch = (
  input: HTMLInputElement,
  loadMoreBtnEl: HTMLButtonElement,
  mainEl: Element,
  titleEl: Element,
  skeletonEls: HTMLElement,
  onMovieClick: (id: number) => void,
) => {
  return async (event: Event) => {
    event.preventDefault();
    let page = 1;

    const query = input.value.trim();
    if (!query) return;

    updateSearchUrl(query);

    const data = await fetchSearchMovies(query, page);

    renderSearchResult(
      data.results,
      data.total_pages,
      mainEl,
      titleEl,
      query,
      loadMoreBtnEl,
      skeletonEls,
      onMovieClick,
    );
  };
};

const updateSearchUrl = (query: string) => {
  const params = new URLSearchParams();
  params.set("query", query);
  history.pushState({}, "", `/search?${params.toString()}`);
};

const renderSearchResult = (
  results: Movie[],
  totalPages: number,
  mainEl: Element,
  titleEl: Element,
  query: string,
  loadMoreBtnEl: HTMLButtonElement,
  skeletonEls: HTMLElement,
  onMovieClick: (id: number) => void,
) => {
  let page = 1;

  titleEl.textContent = `"${query}" 검색 결과`;
  mainEl.innerHTML = "";
  mainEl.appendChild(titleEl);

  if (totalPages === page) hideLoadMoreButton(loadMoreBtnEl);

  if (results.length === 0) {
    const noSearchResultEl = document.createElement("p");
    noSearchResultEl.textContent = "검색 결과가 없습니다.";
    noSearchResultEl.className = "no-search-result";
    mainEl.appendChild(noSearchResultEl);
    return;
  }

  const searchResult = createMovieList(results, onMovieClick);
  mainEl.append(searchResult, loadMoreBtnEl);

  loadMoreBtnEl.onclick = () => {
    page++;
    handleLoadMoreButton(
      page,
      loadMoreBtnEl,
      mainEl,
      skeletonEls,
      onMovieClick,
      query,
    );
  };
};
