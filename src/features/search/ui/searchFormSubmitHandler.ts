import { addMoviePost } from "../../../shared/ui/addMoviePost";
import { showSkeletons } from "../../../shared/ui/showSkeletons";
import { getSearchedPost } from "../api/getSearchedPost";
import { disableMoreButton } from "../../../shared/ui/disabledMoreButton";
import { IMovie } from "../../../shared/types/movies";

export const searchFormSubmitHandler = async (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  let searchQuery = formData.get("search-input");

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

  updateSearchPageUI(
    searchedMovies.results,
    searchedMovies.total_pages,
    params
  );

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
};

export function updateSearchPageUI(
  searchedMovies: IMovie[],
  searchedMoviesTotalPages: number,
  params: URLSearchParams
) {
  const $thumbnailList = document.querySelector(
    ".thumbnail-list"
  ) as HTMLElement;
  const $movieListTitle = document.querySelector(".movie-list-title");

  if (!$thumbnailList || !$movieListTitle) return;

  $thumbnailList.innerHTML = "";
  showSkeletons($thumbnailList);

  $movieListTitle.textContent = `"${params.get("query")}" 검색 결과`;

  $thumbnailList.innerHTML = "";
  addMoviePost(searchedMovies, $thumbnailList);

  disableHeaderImage();
  disableMoreButton(
    searchedMoviesTotalPages,
    parseInt(params.get("page")!),
    searchedMovies
  );
}

function disableHeaderImage() {
  const $overlay = document.querySelector(".overlay");
  $overlay?.classList.add("disabled");

  const $topRatedMovie = document.querySelector(".top-rated-movie");
  $topRatedMovie?.classList.add("disabled");

  const $backgroundContainer = document.querySelector(".background-container");
  $backgroundContainer?.classList.add("background-container-disabled");
}
