import { getMovieList } from "./features/movie/api/getMovieList";
import MoviePost from "./features/movie/ui/MoviePost";
import Header from "./shared/ui/Header";
import { IMovie } from "./shared/types/movies";
import { CustomButton } from "./shared/ui/CustomButton";
import { getSearchedPost } from "./features/search/api/getSearchedPost";

addEventListener("DOMContentLoaded", async () => {
  const $movieList = document.querySelector(
    ".thumbnail-list"
  ) as HTMLElement | null;
  let moviesText = "";

  const movies = await getMovieList({ page: 1 });

  Header(movies.results[0]);

  if ($movieList) {
    moviesText = addMoviePost(movies.results, moviesText);
    $movieList.innerHTML = moviesText;
  }

  const $movieContainer = document.getElementById("movie-container");
  const addMoreMoviesButton = CustomButton({ title: "더보기" });
  addMoreMoviesButton.id = "more-movies-button";
  $movieContainer?.appendChild(addMoreMoviesButton);

  const $moreMoviesButton = document.getElementById("more-movies-button");
  $moreMoviesButton?.addEventListener("click", async () => {
    if (!$movieList) return;

    addMoreMovies(moviesText, $movieList);
  });

  const searchForm = document.querySelector(".search-form");

  searchForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const $overlay = document.querySelector(".overlay");
    $overlay?.classList.add("disabled");

    const $topRatedMovie = document.querySelector(".top-rated-movie");
    $topRatedMovie?.classList.add("disabled");

    const $backgroundContainer = document.querySelector(
      ".background-container"
    );
    $backgroundContainer?.classList.add("background-container-disabled");

    const $movieList = document.querySelector(
      ".thumbnail-list"
    ) as HTMLElement | null;
    moviesText = "";

    const $movieListTitle = document.querySelector(".movie-list-title");

    const formData = new FormData(e.target as HTMLFormElement);
    let searchQuery = formData.get("search-input");

    if ($movieListTitle) {
      $movieListTitle.textContent = `"${searchQuery}" 검색 결과`;
    }

    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");

    if (!page) {
      params.append("page", "1");
      params.append("query", searchQuery as string);
    } else {
      params.set("page", (parseInt(page) + 1).toString());
    }

    const searchedMovies = await getSearchedPost(
      searchQuery as string,
      parseInt(params.get("page")!)
    );

    if ($movieList) {
      moviesText = addMoviePost(searchedMovies.results, moviesText);
      $movieList.innerHTML = moviesText;
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState(null, "", newUrl);
  });
});

function addMoviePost(movieList: IMovie[], movieText: string) {
  movieList.forEach((movie: IMovie) => {
    movieText += MoviePost(movie);
  });

  return movieText;
}

async function addMoreMovies(moviesText: string, $movieList: HTMLElement) {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  const query = params.get("query");

  if (!page) {
    params.append("page", "2");
  } else {
    params.set("page", (parseInt(page) + 1).toString());
  }

  if (query) {
    const searchedMovies = await getSearchedPost(
      query as string,
      parseInt(params.get("page")!)
    );

    moviesText = addMoviePost(searchedMovies.results, moviesText);
  } else {
    const movies = await getMovieList({ page: parseInt(params.get("page")!) });

    moviesText = addMoviePost(movies.results, moviesText);
  }

  if ($movieList) {
    $movieList.innerHTML = moviesText;
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
}
