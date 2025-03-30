import { getSearchParam } from "../apis/config";
import LogoSearchBar from "../components/LogoSearchBar";
import MovieDetailModal from "../components/MovieDetailModal";
import MovieList from "../domains/MovieList";
import MovieService from "../services/MovieService";
import { ContentsContainer } from "./Contents";
import { replaceSkeletonWithMovies, showSkeleton } from "./Contents";

const EVENT_HANDLER = {
  SEARCH_MOVIE: async (inputValue, movieService) => {
    const $moviesContainer = document.getElementById("movies-container");
    const $header = document.querySelector("header");
    if ($header) {
      document.querySelector("header").remove();
    }

    if (inputValue.trim() === "") {
      alert("검색어를 입력해주세요.");
    } else {
      if ($moviesContainer) {
        $moviesContainer.innerHTML = "";
      }
      showSkeleton(10);
      const movies = await movieService.fetchMovies(
        "/search/movie",
        getSearchParam(inputValue, movieService.currentPage)
      );
      const movieList = new MovieList(movies.results);
      replaceSkeletonWithMovies(movieList.movieList);

      ContentsContainer(
        `"${inputValue}" 검색 결과`,
        movieList,
        movieService,
        () =>
          movieService.fetchMovies(
            "/search/movie",
            getSearchParam(inputValue, movieService.currentPage)
          )
      );
    }
  },
  MOVIE_MODAL: async (event) => {
    const $wrap = document.getElementById("wrap");
    const movieId = event.currentTarget.dataset.id;
    const $modal = MovieDetailModal(movieId);

    $wrap.appendChild($modal);
  },
};

export default EVENT_HANDLER;
