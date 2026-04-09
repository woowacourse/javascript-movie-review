import { apiRequest } from "../utils/api";
import { MovieResponse } from "../types/api";
import { createMovieList } from "../components/movie";
import { hideLoadMoreButton, handleLoadMoreButton } from "./movieRenderer";

export const renderPopularMovieList = async (
  loadMoreBtnEl: HTMLButtonElement,
  mainEl: Element,
  skeletonEls: HTMLElement,
) => {
  let page = 1;

  const data = await apiRequest<MovieResponse>({
    url: `/movie/popular?language=ko-KR&page=${page}`,
    method: "GET",
  });
  const movieList = createMovieList(data.results);
  skeletonEls.replaceWith(movieList, loadMoreBtnEl); // 스켈레톤 제거 -> 영화 목록 + 더 보기 버튼 렌더링

  // 더 이상 불러올 페이지가 없는 경우
  if (data.total_pages === page) hideLoadMoreButton(loadMoreBtnEl);

  loadMoreBtnEl.onclick = () => {
    page++;

    handleLoadMoreButton(
      `/movie/popular?language=ko-KR&page=${page}`,
      loadMoreBtnEl,
      mainEl,
      skeletonEls,
    );
  };
};
