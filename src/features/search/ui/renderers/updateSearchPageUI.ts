import { Movie } from "../../../../shared/types/domain/movies";
import { addMoviePost } from "../../../../shared/ui/renderers/addMoviePost";
import { disableHeaderImage } from "../../../../shared/ui/renderers/disableHeaderImage";
import { disableMoreButton } from "../../../../shared/ui/renderers/disabledMoreButton";
import { showSkeletons } from "../../../../shared/ui/renderers/showSkeletons";

export function updateSearchPageUI(
  searchedMovies: Movie[],
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
