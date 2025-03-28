import getMovieDetail from "../../../features/movie/api/getMovieDetail";
import MoviePost from "../../../features/movie/ui/components/MoviePost";
import { showEmptySearchResult } from "../../../features/search/ui/renderers/showEmptySearchResult";
import { IMovie } from "../../types/movies";
import Modal from "../components/Modal";

export function addMoviePost(movieList: IMovie[], $movieList: HTMLElement) {
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

  movieList.forEach((movie: IMovie) => {
    const moviePost = MoviePost(movie);
    moviePost.addEventListener("click", async () => {
      const movieDetail = await getMovieDetail(movie.id);
      document.body.appendChild(Modal(movieDetail));
    });
    fragment.appendChild(moviePost);
  });

  $movieList.appendChild(fragment);
}
