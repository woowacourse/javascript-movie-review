import { getMovieList } from "./features/movie/api/getMovieList";
import Header from "./shared/ui/components/Header";
import { CustomButton } from "./shared/ui/components/CustomButton";
import { showSkeletons } from "./shared/ui/showSkeletons";
import { addMoviePost } from "./shared/ui/addMoviePost";
import { addMoreMovies } from "./shared/domain/addMoreMovies";

addEventListener("DOMContentLoaded", async () => {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;

  checkUrl();
  await initMovieList($movieList);
  await initAddMoreMoviesButton($movieList);
});

function checkUrl() {
  const url = new URL(window.location.href);
  if (url.searchParams.has("page")) {
    url.searchParams.delete("page");
    window.history.replaceState({}, document.title, url.pathname);
    window.location.reload();
  }
}

async function initMovieList(movieList: HTMLElement) {
  if (movieList) showSkeletons(movieList);

  const movies = await getMovieList({ page: 1 });

  if (movies && movieList) {
    Header(movies.results[0]);

    movieList.innerHTML = "";
    addMoviePost(movies.results, movieList);
  }
}

async function initAddMoreMoviesButton(movieList: HTMLElement) {
  const $movieContainer = document.getElementById("movie-container");
  const addMoreMoviesButton = CustomButton({
    title: "더보기",
    className: "add-more-button",
    id: "more-movies-button",
  });
  $movieContainer?.appendChild(addMoreMoviesButton);

  const $moreMoviesButton = document.getElementById("more-movies-button");
  $moreMoviesButton?.addEventListener("click", async () => {
    if (!movieList) return;
    await addMoreMovies(movieList);
  });
}
