import { addMovieCard } from "../../../shared/ui/movies/addMovieCard";
import ErrorPage from "../../../shared/ui/components/ErrorPage";
import { withSkeleton } from "../../../shared/ui/skeletons/withSkeleton";
import { getSearchedMovie } from "../api/getSearchedMovie";

export async function updateSearchedMovieUI(
  $container: HTMLElement,
  searchQuery: string
) {
  try {
    disableElements();
    updateHeaderTitle(searchQuery);

    const searchedMovies = await withSkeleton(
      $container,
      getSearchedMovie(String(searchQuery), 1)
    );

    if (searchedMovies) {
      addMovieCard(searchedMovies.results, $container);
    }
  } catch (error) {
    ErrorPage("검색한 영화 리스트를 불러오는데 실패하였습니다.");
  }
}

function updateHeaderTitle(searchQuery: string) {
  const $movieListTitle = document.querySelector(".movie-list-title");
  if ($movieListTitle) {
    $movieListTitle.textContent = `"${searchQuery}" 검색 결과`;
  }
}

function disableElements() {
  const $overlay = document.querySelector(".overlay");
  $overlay?.classList.add("disabled");

  const $topRatedMovie = document.querySelector(".top-rated-movie");
  $topRatedMovie?.classList.add("disabled");

  const $backgroundContainer = document.querySelector(".background-container");
  $backgroundContainer?.classList.add("background-container-disabled");
}
