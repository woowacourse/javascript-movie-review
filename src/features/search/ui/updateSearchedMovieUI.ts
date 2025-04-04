import { addMovieCard } from "../../movie/ui/addMovieCard";
import ErrorModal from "../../../shared/ui/components/ErrorModal";
import { withSkeleton } from "../../skeleton/ui/withSkeleton";
import { getSearchedMovie } from "../api/getSearchedMovie";
import { movieDetailModalHandler } from "../../detailModal/ui/movieDetailModalHandler";
import Header from "../../movie/ui/components/Header";

export async function updateSearchedMovieUI(
  $container: HTMLElement,
  searchQuery: string
) {
  try {
    Header.addClassToElements([
      { selector: ".overlay", className: "disabled" },
      { selector: ".top-rated-movie", className: "disabled" },
      {
        selector: ".background-container",
        className: "background-container-disabled",
      },
    ]);
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
