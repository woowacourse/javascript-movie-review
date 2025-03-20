import { getMovieList } from "./features/movie/api/getMovieList";
import Header from "./shared/ui/components/Header";
import { CustomButton } from "./shared/ui/components/CustomButton";
import { showSkeletons } from "./shared/ui/showSkeletons";
import { addMoviePost } from "./shared/ui/addMoviePost";
import { addMoreMovies } from "./shared/domain/addMoreMovies";
import { searchFormSubmitHandler } from "./features/search/ui/searchFormSubmitHandler";

addEventListener("DOMContentLoaded", async () => {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;

  if ($movieList) showSkeletons($movieList);

  const movies = await getMovieList({ page: 1 });

  Header(movies.results[0]);

  if ($movieList) {
    $movieList.innerHTML = "";
    addMoviePost(movies.results, $movieList);
  }

  const $movieContainer = document.getElementById("movie-container");
  const addMoreMoviesButton = CustomButton({
    title: "더보기",
    className: "add-more-button",
  });
  addMoreMoviesButton.id = "more-movies-button";
  $movieContainer?.appendChild(addMoreMoviesButton);

  const $moreMoviesButton = document.getElementById("more-movies-button");
  $moreMoviesButton?.addEventListener("click", async () => {
    if (!$movieList) return;
    await addMoreMovies($movieList);
  });

  const searchForm = document.querySelector(".search-form");

  searchForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    searchFormSubmitHandler(e);
  });
});
