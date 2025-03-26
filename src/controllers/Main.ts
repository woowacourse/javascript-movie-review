import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import { MovieInfo } from "../../types/movieType.ts";
import {ContentsContainer, render} from "./Contents.ts";
import MovieService from "../services/MovieService.ts";
import LogoSearchBar from "../components/LogoSearchBar.js";
import EVENT_HANDLER from "./EventHandler.js";

export const state = {
  isLoading: false as Boolean,
  movies: [] as MovieInfo[],
};

type stateProps = {
  isLoading?: boolean;
  movies?: MovieInfo[];
};

export function setState(newState: stateProps) {
  Object.assign(state, newState);
  render();
}


function renderHeader({ title, poster_path, vote_average }: MovieInfo) {
  const container = document.querySelector("#wrap");
  const logoSearchBar = LogoSearchBar();
  const $header = Header({ title, poster_path, vote_average });

  container?.prepend($header);
  
  $header.prepend(logoSearchBar);
  container?.prepend(logoSearchBar);
}

function renderFooter() {
  const $wrap = document.getElementById("wrap");
  const footer = Footer();
  $wrap?.appendChild(footer);
}

export function setupSearchEvents() {
  const input = document.querySelector(".search-input");
  const button = document.querySelector(".search-button");

  input?.addEventListener("keydown", (event) => {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === "Enter" && keyboardEvent.isComposing === false) {
      const inputValue = (event.target as HTMLInputElement).value;
      EVENT_HANDLER.SEARCH_MOVIE(inputValue);
    }
  });

  button?.addEventListener("click", () => {
    const inputValue = (input as HTMLInputElement)?.value;
    EVENT_HANDLER.SEARCH_MOVIE(inputValue);
  });
}

async function renderInitContent(movieService: MovieService) {
  const data = await movieService.getPopularMovies();

  ContentsContainer(data.results, "지금 인기 있는 영화", movieService, () => movieService.getPopularMovies());
  setupSearchEvents();
}

async function main() {
  const movieService = new MovieService();
  const data = await movieService.getPopularMovies();

  renderHeader(data.results[0]);
  renderInitContent(movieService);
  renderFooter();
}

main();
