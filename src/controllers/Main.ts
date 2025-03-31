import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import { FetchMoviesCallback, MovieInfo } from "../../types/movieType.ts";
import { ContentsContainer, replaceSkeletonWithMovies, showSkeleton } from "./Contents.ts";
import MovieService from "../services/MovieService.ts";
import LogoSearchBar from "../components/LogoSearchBar.js";
import { getPopularParam } from "../apis/config.js";
import MovieList from '../domains/MovieList';
import registerSearchEventHandlers from "./MovieSearchHandlers.js";

export interface ObserverHTMLElement extends HTMLElement {
  observer?: IntersectionObserver;
}

async function renderHeader({ title, poster_path, vote_average }: MovieInfo) {
  const $wrap = document.querySelector("#wrap");
  const $header = Header({
    title,
    poster_path,
    vote_average
  });
  $wrap?.prepend($header);
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
      registerSearchEventHandlers(inputValue, movieService);
    }
  });

  button?.addEventListener("click", () => {
    const inputValue = (input as HTMLInputElement)?.value;
    movieService.initPage();
    registerSearchEventHandlers(inputValue, movieService);
  });
}

async function renderInitContent(movieList:MovieList, movieService: MovieService) {
  ContentsContainer("지금 인기 있는 영화", movieList);
  setupSearchEvents(movieService);
}

async function loadMoreMovies(fetchMoviesCallback: FetchMoviesCallback) {
  showSkeleton(10);
  const movies = await fetchMoviesCallback()
  const movieList = new MovieList(movies.results);
  replaceSkeletonWithMovies(movieList.movieList);
}

export function setupInfiniteScroll(FetchMoviesCallback: FetchMoviesCallback) {
  const sentinel = document.getElementById("sentinel") as ObserverHTMLElement;
  if (!sentinel) return;

  if (sentinel.observer) {
    sentinel.observer.disconnect();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMoreMovies(FetchMoviesCallback);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );
  sentinel.observer = observer;
  observer.observe(sentinel);
}

async function main() {
  const movieService = new MovieService();
  showSkeleton(20)
  const movies = await movieService.fetchMovies(
    "/movie/popular",
    getPopularParam(movieService.currentPage)
  );
  const movieList = new MovieList(movies.results);
  replaceSkeletonWithMovies(movieList.movieList);

  renderHeader(movies.results[0]);
  renderFooter();
  renderInitContent(movieList, movieService);

  const popularFetchCallback = () =>
    movieService.fetchMovies(
      "/movie/popular",
      getPopularParam(movieService.currentPage)
    );

  setupInfiniteScroll(popularFetchCallback);
}

main();