import ErrorPage from "../../../shared/ui/components/ErrorPage";
import { apiClient } from "../../../shared/utils/apiClient";

export const getSearchedPost = async (query: string, page: number) => {
  try {
    return await apiClient(
      "GET",
      `/search/movie?query=${query}&include_adult=true&language=ko-KR&page=${page}`
    );
  } catch (error) {
    if (error instanceof Error) {
      const $container = document.querySelector(".container");
      $container!.replaceChildren(
        ErrorPage("검색 결과를 불러오는데 실패하였습니다.")
      );
    }
  }
};
