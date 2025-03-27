import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import { MovieInfo } from "../../types/movieType.ts";
import { ContentsContainer, replaceSkeletonWithMovies, showSkeleton } from "./Contents.ts";
import MovieService from "../services/MovieService.ts";
import LogoSearchBar from "../components/LogoSearchBar.js";
import EVENT_HANDLER from "./EventHandler.js";
import { getPopularParam } from "../apis/config.js";
import MovieList from '../domains/MovieList';

async function renderHeader({ title, poster_path, vote_average }: MovieInfo) {
  const container = document.querySelector("#wrap");
  const logoSearchBar = LogoSearchBar();
  const $header = Header({
    title,
    poster_path,
    vote_average
  });

  container?.prepend($header);
  $header.prepend(logoSearchBar);
  container?.prepend(logoSearchBar);
}

function renderFooter() {
  const $wrap = document.getElementById("wrap");
  const footer = Footer();
  $wrap?.appendChild(footer);
}

export function setupSearchEvents(movieService: MovieService) {
  const input = document.querySelector(".search-input");
  const button = document.querySelector(".search-button");

  input?.addEventListener("keydown", (event) => {
    const keyboardEvent = event as KeyboardEvent;
    
    if (keyboardEvent.key === "Enter" && keyboardEvent.isComposing === false) {
      const inputValue = (event.target as HTMLInputElement).value;
      movieService.initPage(); 
      EVENT_HANDLER.SEARCH_MOVIE(inputValue, movieService);
    }
  });

  button?.addEventListener("click", () => {
    const inputValue = (input as HTMLInputElement)?.value;
    movieService.initPage();
    EVENT_HANDLER.SEARCH_MOVIE(inputValue, movieService);
  });
}

async function renderInitContent(movieList:MovieList, movieService: MovieService) {
  ContentsContainer("지금 인기 있는 영화", movieList, movieService, () =>
     movieService.fetchMovies(
      "/movie/popular",
      getPopularParam(movieService.currentPage)
    )
  );

  setupSearchEvents(movieService);
}

async function main() {
  const movieService = new MovieService();
  showSkeleton(20)
  const dataArr = await movieService.fetchMovies(
    "/movie/popular",
    getPopularParam(movieService.currentPage)
  );
  const movieList = new MovieList(dataArr.results)
  replaceSkeletonWithMovies(movieList.movieList);

  renderHeader(dataArr.results[0]);
  renderFooter();
  renderInitContent(movieList, movieService);
}

main();
