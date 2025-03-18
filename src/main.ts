import { getMovieList } from "./features/movie/api/getMovieList";
import MoviePost from "./features/movie/ui/MoviePost";
import { IMovie } from "./shared/types/movies";

addEventListener("DOMContentLoaded", async () => {
  const $movieList = document.querySelector(".thumbnail-list");
  let moviesText = "";

  const movies = await getMovieList();
  movies.results.forEach((movie: IMovie) => {
    moviesText += MoviePost(movie);
  });

  if ($movieList) {
    $movieList.innerHTML = moviesText;
  }
});
