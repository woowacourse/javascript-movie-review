import { addMoviePost } from "../../../../shared/ui/renderers/addMoviePost";
import { showSkeletons } from "../../../../shared/ui/renderers/showSkeletons";
import { getSearchedPost } from "../../api/getSearchedPost";
import { disableMoreButton } from "../../../../shared/ui/renderers/disabledMoreButton";
import { IMovie } from "../../../../shared/types/movies";
import { showErrorPage } from "../../../../shared/ui/renderers/showErrorPage";
import { setParams } from "../../../../shared/domain/setParams";
import { getParams } from "../../../../shared/domain/getParams";
import { disableHeaderImage } from "../../../../shared/ui/renderers/disableHeaderImage";

export const searchFormSubmitHandler = async (e: Event) => {
  try {
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search-input") as string;
    setParams(searchQuery, 1);
    const { currentPage } = getParams(new URL(window.location.href));
    const searchedMovies = await getSearchedPost(searchQuery, currentPage);

    updateSearchPageUI(searchedMovies.results, searchedMovies.total_pages, {
      pageNum: currentPage,
      searchQuery,
    });
  } catch (error) {
    showErrorPage();
  }
};

export function updateSearchPageUI(
  searchedMovies: IMovie[],
  searchedMoviesTotalPages: number,
  { pageNum, searchQuery }: { pageNum: number; searchQuery: string }
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
  disableMoreButton(searchedMoviesTotalPages, pageNum, searchedMovies);
}
