import { addMoviePost } from "../../../../shared/ui/renderers/addMoviePost";
import { showSkeletons } from "../../../../shared/ui/renderers/showSkeletons";
import { getSearchedPost } from "../../api/getSearchedPost";
import { disableMoreButton } from "../../../../shared/ui/renderers/disabledMoreButton";
import { IMovie } from "../../../../shared/types/movies";
import { showErrorPage } from "../../../../shared/ui/renderers/showErrorPage";
import { setParams } from "../../../../shared/domain/setParams";
import { pageManager } from "../../../../shared/domain/pageManager";
import { disableHeaderImage } from "../../../../shared/ui/renderers/disableHeaderImage";

export const searchFormSubmitHandler = async (e: Event) => {
  try {
    pageManager.initializePageInfo();
    const currentPage = pageManager.currentPage;
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search-input") as string;
    setParams(searchQuery);

    const searchedMovies = await getSearchedPost(searchQuery, currentPage);
    pageManager.setTotalPages(searchedMovies.total_pages);

    updateSearchPageUI(searchedMovies.results, searchQuery, {
      pageNum: currentPage,
      totalPages: pageManager.totalPages,
    });
  } catch (error) {
    showErrorPage();
  }
};

export function updateSearchPageUI(
  searchedMovies: IMovie[],
  searchQuery: string,
  { pageNum, totalPages }: { pageNum: number; totalPages: number }
) {
  const $thumbnailList = document.querySelector(
    ".thumbnail-list"
  ) as HTMLElement;
  const $movieListTitle = document.querySelector(".movie-list-title");

  if (!$thumbnailList || !$movieListTitle) return;

  $thumbnailList.innerHTML = "";
  showSkeletons($thumbnailList);

  $movieListTitle.textContent = `"${searchQuery}" 검색 결과`;

  $thumbnailList.innerHTML = "";
  addMoviePost(searchedMovies, $thumbnailList);

  disableHeaderImage();
  disableMoreButton(totalPages, pageNum, searchedMovies);
}
