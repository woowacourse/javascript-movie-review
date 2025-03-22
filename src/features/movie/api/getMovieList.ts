import { IMovieList } from "../../../shared/types/movies";
import ErrorPage from "../../../shared/ui/components/ErrorPage";
import { apiClient } from "../../../shared/utils/apiClient";

export const getMovieList = async ({
  page,
}: {
  page: number;
}): Promise<IMovieList | void> => {
  try {
    return await apiClient("GET", `/tv/popular?page=${page}`);
  } catch (error) {
    if (error instanceof Error) {
      const $container = document.querySelector(".container");
      $container!.replaceChildren(
        ErrorPage("영화 리스트를 불러오는데 실패하였습니다.")
      );
    }
  }
};
