import { getSearchParam } from "../apis/config";
import LogoSearchBar from "../components/LogoSearchBar";
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
      const data = await movieService.fetchMovies(
        "/search/movie",
        getSearchParam(inputValue, movieService.currentPage)
      );
      const movieList = new MovieList(data.results);
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
};

export default EVENT_HANDLER;
