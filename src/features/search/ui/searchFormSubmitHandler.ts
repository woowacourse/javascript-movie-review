import { addMoviePost } from "../../../shared/ui/addMoviePost";
import { showSkeletons } from "../../../shared/ui/showSkeletons";
import { getSearchedPost } from "../api/getSearchedPost";
import { disableMoreButton } from "../../../shared/ui/disabledMoreButton";
import { IMovie } from "../../../shared/types/movies";
import { showErrorPage } from "../../../shared/ui/showErrorPage";

export const searchFormSubmitHandler = async (e: Event) => {
  try {
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search-input") as string;
    const params = new URLSearchParams({
      page: "1",
      query: searchQuery as string,
    });
    const pageNum = params.get("page") ? parseInt(params.get("page")!) : 1;
    const searchedMovies = await getSearchedPost(searchQuery, pageNum);

    updateSearchPageUI(searchedMovies.results, searchedMovies.total_pages, {
      pageNum,
      searchQuery,
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState(null, "", newUrl);
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

function disableHeaderImage() {
  const $overlay = document.querySelector(".overlay");
  $overlay?.classList.add("disabled");

  const $topRatedMovie = document.querySelector(".top-rated-movie");
  $topRatedMovie?.classList.add("disabled");

  const $backgroundContainer = document.querySelector(".background-container");
  $backgroundContainer?.classList.add("background-container-disabled");
}
