import getMovieDetail from "../../../features/movie/api/getMovieDetail";
import MoviePost from "../../../features/movie/ui/components/MoviePost";
import { showEmptySearchResult } from "../../../features/search/ui/renderers/showEmptySearchResult";
import { Movie } from "../../types/domain/movies";
import Modal from "../components/Modal";

export function addMoviePost(movieList: Movie[], $movieList: HTMLElement) {
  if (movieList.length === 0) {
    showEmptySearchResult();

    return;
  }

  const $emptySearchResult = document.querySelector(
    ".empty-search-result-container"
  );
  const $moreMoviesButton = document.getElementById("more-movies-button");

  if ($emptySearchResult) {
    $emptySearchResult.remove();
    $moreMoviesButton?.classList.remove("disabled");
  }

  const fragment = document.createDocumentFragment();

  movieList.forEach((movie: Movie) => {
    const moviePost = MoviePost(movie);
    const $wrap = document.querySelector("#wrap");
    moviePost.addEventListener("click", async () => {
      const movieDetail = await getMovieDetail(movie.id);
      $wrap?.appendChild(Modal(movieDetail));
    });
    fragment.appendChild(moviePost);
  });

  $movieList.appendChild(fragment);
}
