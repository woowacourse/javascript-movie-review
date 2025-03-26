import LogoSearchBar from "../components/LogoSearchBar";
import MovieService from "../services/MovieService";
import { ContentsContainer } from "./Contents";

const EVENT_HANDLER = {
  SEARCH_MOVIE: async (inputValue) => {
    const $moviesContainer = document.getElementById("movies-container");
    const $header = document.querySelector("header");
    if ($header) {
      document.querySelector("header").remove();
    }

    if (inputValue.trim() === "") {
      alert("검색어를 입력해주세요.");
    } else {
      const movieService = new MovieService();
      const data = await movieService.getSearchResult(inputValue);
      if ($moviesContainer) {
        $moviesContainer.innerHTML = "";
      }
      ContentsContainer(
        data.results,
        `"${inputValue}" 검색 결과`,
        movieService,
        () => movieService.getSearchResult(inputValue)
      );
    }
  },
};

export default EVENT_HANDLER;
