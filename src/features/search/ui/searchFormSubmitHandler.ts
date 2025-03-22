import { addMovieCard } from "../../../shared/ui/addMovieCard";
import { showSkeletons } from "../../../shared/ui/showSkeletons";
import { getUrlParams } from "../../../shared/utils/getUrlParams";
import { updateUrl } from "../../../shared/utils/updateUrl";
import { getSearchedMovie } from "../api/getSearchedMovie";

export const searchFormSubmitHandler = async (e: Event) => {
  const $thumbnailList = document.querySelector(
    ".thumbnail-list"
  ) as HTMLElement | null;

  if ($thumbnailList) {
    $thumbnailList.innerHTML = "";
    showSkeletons($thumbnailList);
  }

  disableElements();
  const $movieListTitle = document.querySelector(".movie-list-title");

  const formData = new FormData(e.target as HTMLFormElement);
  let searchQuery = formData.get("search-input");

  if ($movieListTitle) {
    $movieListTitle.textContent = `"${searchQuery}" 검색 결과`;
  }

  const params = getUrlParams();
  updateUrlParams(params, searchQuery as string);

  const searchedMovies = await getSearchedMovie(
    searchQuery as string,
    parseInt(params.get("page")!)
  );

  if ($thumbnailList && searchedMovies) {
    $thumbnailList.innerHTML = "";
    addMovieCard(searchedMovies.results, $thumbnailList);
  }

  updateUrl(params);
};

function disableElements() {
  const $overlay = document.querySelector(".overlay");
  $overlay?.classList.add("disabled");

  const $topRatedMovie = document.querySelector(".top-rated-movie");
  $topRatedMovie?.classList.add("disabled");

  const $backgroundContainer = document.querySelector(".background-container");
  $backgroundContainer?.classList.add("background-container-disabled");
}

function updateUrlParams(params: URLSearchParams, searchQuery: string) {
  const page = params.get("page");

  if (!page) {
    params.append("page", "1");
    params.append("query", searchQuery);
  } else {
    params.set("page", "1");
    params.set("query", searchQuery);
  }
}
