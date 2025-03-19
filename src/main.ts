import { getMovieList } from "./features/movie/api/getMovieList";
import MoviePost from "./features/movie/ui/MoviePost";
import Header from "./shared/ui/Header";
import { IMovie } from "./shared/types/movies";
import { CustomButton } from "./shared/ui/CustomButton";

addEventListener("DOMContentLoaded", async () => {
  const $movieList = document.querySelector(".thumbnail-list");
  let moviesText = "";

  const movies = await getMovieList({ page: 1 });

  Header(movies.results[0]);

  movies.results.forEach((movie: IMovie) => {
    moviesText += MoviePost(movie);
  });

  if ($movieList) {
    $movieList.innerHTML = moviesText;
  }

  const $movieContainer = document.getElementById("movie-container");
  const addMoreMoviesButton = CustomButton({ title: "더보기" });
  addMoreMoviesButton.id = "more-movies-button";
  $movieContainer?.appendChild(addMoreMoviesButton);

  const $moreMoviesButton = document.getElementById("more-movies-button");
  $moreMoviesButton?.addEventListener("click", async () => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");

    if (!page) {
      params.append("page", "2");
    } else {
      params.set("page", (parseInt(page) + 1).toString());
    }
    const movies = await getMovieList({ page: parseInt(params.get("page")!) });
    movies.results.forEach((movie: IMovie) => {
      moviesText += MoviePost(movie);
    });
    if ($movieList) {
      $movieList.innerHTML = moviesText;
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState(null, "", newUrl);
  });
});
