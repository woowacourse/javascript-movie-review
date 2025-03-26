import { addMoviePost } from "../../../shared/ui/addMoviePost";
import { showSkeletons } from "../../../shared/ui/showSkeletons";
import { getSearchedPost } from "../api/getSearchedPost";
import { disableMoreButton } from "../../../shared/ui/disabledMoreButton";

export const searchFormSubmitHandler = async (e: Event) => {
  const $thumbnailList = document.querySelector(
    ".thumbnail-list"
  ) as HTMLElement | null;

  if ($thumbnailList) {
    $thumbnailList.innerHTML = "";
    showSkeletons($thumbnailList);
  }

  const $overlay = document.querySelector(".overlay");
  $overlay?.classList.add("disabled");

  const $topRatedMovie = document.querySelector(".top-rated-movie");
  $topRatedMovie?.classList.add("disabled");

  const $backgroundContainer = document.querySelector(".background-container");
  $backgroundContainer?.classList.add("background-container-disabled");

  const $movieListTitle = document.querySelector(".movie-list-title");

  const formData = new FormData(e.target as HTMLFormElement);
  let searchQuery = formData.get("search-input");

  if ($movieListTitle) {
    $movieListTitle.textContent = `"${searchQuery}" 검색 결과`;
  }

  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");

  if (!page) {
    params.append("page", "1");
    params.append("query", searchQuery as string);
  } else {
    params.set("page", "1");
    params.set("query", searchQuery as string);
  }

  const searchedMovies = await getSearchedPost(
    searchQuery as string,
    parseInt(params.get("page")!)
  );

  disableMoreButton(
    searchedMovies.total_pages,
    parseInt(params.get("page")!),
    searchedMovies.results
  );

  if ($thumbnailList) {
    $thumbnailList.innerHTML = "";
    addMoviePost(searchedMovies.results, $thumbnailList);
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
};
