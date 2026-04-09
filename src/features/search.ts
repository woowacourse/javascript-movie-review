import { apiRequest } from "../utils/api";
import { MovieResponse } from "../types/api";
import { createMovieList } from "../components/movie";
import { hideLoadMoreButton, handleLoadMoreButton } from "./movieRenderer";

export const handleSearch = (
  input: HTMLInputElement,
  loadMoreBtnEl: HTMLButtonElement,
  mainEl: Element,
  titleEl: Element,
  skeletonEls: HTMLElement,
) => {
  return async (event: Event) => {
    event.preventDefault();
    let page = 1;

    const query = input.value.trim();
    if (!query) return;

    updateSearchUrl(query);

    const data = await apiRequest<MovieResponse>({
      url: `/search/movie?language=ko-KR&query=${query}&page=${page}`,
      method: "GET",
    });

    renderSearchResult(
      data,
      mainEl,
      titleEl,
      query,
      loadMoreBtnEl,
      skeletonEls,
    );
  };
};

// 검색어를 URL에 반영하는 함수
const updateSearchUrl = (query: string) => {
  const params = new URLSearchParams();

  params.set("query", query);
  history.pushState({}, "", `/search?${params.toString()}`);
};

// 검색 결과를 렌더링하는 함수
const renderSearchResult = (
  data: MovieResponse,
  mainEl: Element,
  titleEl: Element,
  query: string,
  loadMoreBtnEl: HTMLButtonElement,
  skeletonEls: HTMLElement,
) => {
  let page = 1;

  titleEl.textContent = `"${query}" 검색 결과`;
  mainEl.innerHTML = "";
  mainEl.appendChild(titleEl);

  // 더 이상 불러올 페이지가 없는 경우
  if (data.total_pages === page) hideLoadMoreButton(loadMoreBtnEl);

  if (data.results.length === 0) {
    const noSearchResultEl = document.createElement("p");
    noSearchResultEl.textContent = "검색 결과가 없습니다.";
    noSearchResultEl.className = "no-search-result";
    mainEl.appendChild(noSearchResultEl);
    return;
  }

  if (data.results.length > 0) {
    const searchResult = createMovieList(data.results);
    mainEl.append(searchResult, loadMoreBtnEl);
  }

  loadMoreBtnEl.onclick = () => {
    page++;
    handleLoadMoreButton(
      `/search/movie?language=ko-KR&query=${query}&page=${page}`,
      loadMoreBtnEl,
      mainEl,
      skeletonEls,
    );
  };
};
