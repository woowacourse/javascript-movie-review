import { addMovieCard } from "../../../shared/ui/movies/addMovieCard";
import ErrorModal from "../../../shared/ui/components/ErrorModal";
import { withSkeleton } from "../../../shared/ui/skeletons/withSkeleton";
import { getSearchedMovie } from "../api/getSearchedMovie";
import { movieDetailModalHandler } from "../../../shared/ui/detailModal/movieDetailModalHandler";
import Header from "../../../shared/ui/components/Header";

export async function updateSearchedMovieUI(
  $container: HTMLElement,
  searchQuery: string
) {
  try {
    disableElements();
    Header.updateMovieContainerTitle(searchQuery);

    const searchedMovies = await withSkeleton(
      $container,
      getSearchedMovie(String(searchQuery), 1)
    );

    if (searchedMovies) {
      addMovieCard(searchedMovies.results, $container);
      movieDetailModalHandler();
    }
  } catch (error) {
    ErrorModal("검색한 영화 리스트를 불러오는데 실패하였습니다.");
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
