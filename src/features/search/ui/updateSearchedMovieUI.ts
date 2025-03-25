import { addMovieCard } from "../../../shared/ui/addMovieCard";
import ErrorPage from "../../../shared/ui/components/ErrorPage";
import { withSkeleton } from "../../../shared/ui/withSkeleton";
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
      getSearchedMovie(searchQuery as string, 1)
    );

    if (searchedMovies) {
      addMovieCard(searchedMovies.results, $container);
    }
  } catch (error) {
    if (error instanceof Error) {
      ErrorPage(error.message);
    }
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
