import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import { FetchMoviesCallback, MovieInfo } from "../../types/movieType.ts";
import { ContentsContainer, replaceSkeletonWithMovies, showSkeleton } from "./Contents.ts";
import MovieService from "../services/MovieService.ts";
import MovieList from '../domains/MovieList';
import movieSearch, { clickHome } from "./MovieSearch.ts";
import { fetchPopularMovies } from "../apis/fetch.js";

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
      movieSearch(inputValue, movieService);
    }
  });

  button?.addEventListener("click", () => {
    const inputValue = (input as HTMLInputElement)?.value;
    movieService.initPage();
    movieSearch(inputValue, movieService);
  });
}

async function renderInitContent(movieList:MovieList, movieService: MovieService) {
  ContentsContainer("지금 인기 있는 영화", movieList);
  setupSearchEvents(movieService);
}

export async function loadMoreMovies(fetchMoviesCallback: FetchMoviesCallback) {
  showSkeleton(20);
  const movies = await fetchMoviesCallback()
  const movieList = new MovieList(movies.results);
  replaceSkeletonWithMovies(movieList.movieList);
}

export function setupInfiniteScroll(
  FetchMoviesCallback: FetchMoviesCallback,
  movieService: MovieService
) {
  const sentinel = document.getElementById("sentinel") as ObserverHTMLElement;
  if (!sentinel) return;

  if (sentinel.observer) {
    sentinel.observer.disconnect();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && movieService.currentPage-1 !== movieService.totalPages) {
          loadMoreMovies(FetchMoviesCallback);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    }
  );
  sentinel.observer = observer;
  observer.observe(sentinel);
}

async function Main() {
  const movieService = new MovieService();
  showSkeleton(20)
  const movies = await fetchPopularMovies(movieService);
  const movieList = new MovieList(movies.results);

  renderHeader(movies.results[0]);
  clickHome()
  renderInitContent(movieList, movieService)
  renderFooter();

  const popularFetchCallback = () => fetchPopularMovies(movieService);
  setupInfiniteScroll(popularFetchCallback, movieService);
}

Main();
