import { getMovieList } from "./features/movie/api/getMovieList";
import { getSearchedPost } from "./features/search/api/getSearchedPost";
import Header from "./shared/ui/components/Header";
import { CustomButton } from "./shared/ui/components/CustomButton";
import { showSkeletons } from "./shared/ui/showSkeletons";
import { addMoviePost } from "./shared/ui/addMoviePost";
import { addMoreMovies } from "./shared/domain/addMoreMovies";
import { updateSearchPageUI } from "./features/search/ui/searchFormSubmitHandler";

addEventListener("DOMContentLoaded", async () => {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;

  await initMovieList($movieList);
  await initAddMoreMoviesButton($movieList);
});

async function initMovieList(movieList: HTMLElement) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const query = params.get("query");
  const movies = query
    ? await getSearchedPost(query, 1)
    : await getMovieList({ page: 1 });

  if (!movies || !movieList) return;

  showSkeletons(movieList);

  Header(movies.results[0]);

  if (query) {
    url.searchParams.set("page", "1");
    window.history.replaceState({}, document.title, url.toString());
    updateSearchPageUI(movies.results, movies.total_pages, url.searchParams);
  } else {
    movieList.innerHTML = "";
    addMoviePost(movies.results, movieList);
  }
}

async function initAddMoreMoviesButton(movieList: HTMLElement) {
  const $movieContainer = document.getElementById("movie-container");
  if (!$movieContainer) return;

  const addMoreMoviesButton = CustomButton({
    title: "더보기",
    className: "add-more-button",
    id: "more-movies-button",
  });

  $movieContainer.appendChild(addMoreMoviesButton);

  const $moreMoviesButton = document.getElementById("more-movies-button");
  if (!$moreMoviesButton) return;

  $moreMoviesButton.addEventListener("click", async () => {
    if (!movieList) return;
    await addMoreMovies(movieList);
  });
}
