import Footer from "./components/Footer";
import Header from "./components/Header";
import { MovieInfo } from "../types/movieType.ts";
import {ContentsContainer} from "./components/ContentsContainer.ts";
import MovieService from "./services/MovieService.ts";
import LogoSearchBar from "./components/LogoSearchBar.js";
import EVENT_HANDLER from "./components/EventHandler.js";

function renderHeader({ title, poster_path, vote_average }: MovieInfo) {
  const container = document.querySelector("#wrap");
  const header = Header({ title, poster_path, vote_average });
  const logoSearchBar = LogoSearchBar();
  header.querySelector(".top-rated-container")?.prepend(logoSearchBar);
  container?.prepend(header);
}

function renderFooter() {
  const container = document.querySelector("#wrap");
  const footer = Footer();
  container?.appendChild(footer);
}

function setupSearchEvents(movieService: MovieService) {
  const input = document.querySelector(".search-input");
  const button = document.querySelector(".search-button");

  input?.addEventListener("keydown", (event) => {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === "Enter") {
      const inputValue = (event.target as HTMLInputElement).value;
      EVENT_HANDLER.SEARCH_MOVIE(movieService, inputValue);
    }
  });

  button?.addEventListener("click", () => {
    const inputValue = (input as HTMLInputElement)?.value;
    EVENT_HANDLER.SEARCH_MOVIE(movieService, inputValue);
  });
}

async function renderContent(movieService: MovieService, results: MovieInfo[]) {
  ContentsContainer(results, "지금 인기 있는 영화");
  setupSearchEvents(movieService);
}

async function main() {
  const movieService = new MovieService();
  const data = await movieService.getPopularMovies();

  renderHeader(data.results[0]);
  renderContent(movieService, data.results);
  renderFooter();
}

main();
