import { apiRequest } from "../utils/api";
import { MovieResponse } from "../types/api";
import { createMovieList } from "../components/movie";

export const hideLoadMoreButton = (loadMoreBtnEl: HTMLButtonElement) => {
  loadMoreBtnEl.classList.add("hidden");
};

export const handleLoadMoreButton = async (
  url: string,
  loadMoreBtnEl: HTMLButtonElement,
  mainEl: Element,
  skeletonEls: HTMLElement,
) => {
  loadMoreBtnEl.disabled = true;

  mainEl.append(skeletonEls, loadMoreBtnEl);

  const data = await apiRequest<MovieResponse>({
    url: url,
    method: "GET",
  });

  if (data) {
    loadMoreBtnEl.disabled = false;

    const newMovieList = createMovieList(data.results);
    skeletonEls.replaceWith(newMovieList); // 스켈레톤 제거 -> 새로운 영화 목록 렌더링
  }
};
