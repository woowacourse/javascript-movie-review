import { getMovieList } from "./features/movie/api/getMovieList";
import { getSearchedPost } from "./features/search/api/getSearchedPost";
import Header from "./shared/ui/components/Header";
import { CustomButton } from "./shared/ui/components/CustomButton";
import { showSkeletons } from "./shared/ui/renderers/showSkeletons";
import { addMoviePost } from "./shared/ui/renderers/addMoviePost";
import { addMoreMovies } from "./shared/domain/addMoreMovies";
import { updateSearchPageUI } from "./features/search/ui/handlers/searchFormSubmitHandler";
import { showErrorPage } from "./shared/ui/renderers/showErrorPage";
import { getQueryParam } from "./shared/domain/getParams";
import { setParams } from "./shared/domain/setParams";
import { pageManager } from "./shared/domain/pageManager";

addEventListener("DOMContentLoaded", async () => {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;

  await initMovieList($movieList);
  await initAddMoreMoviesButton($movieList);
});

async function initMovieList(movieList: HTMLElement) {
  try {
    const query = getQueryParam(new URL(window.location.href));
    const movies = query
      ? await getSearchedPost(query, 1)
      : await getMovieList({ page: 1 });

    pageManager.setTotalPages(movies.total_pages);

    if (!movies || !movieList) return;

    showSkeletons(movieList);

    Header(movies.results[0]);

    if (query) {
      updateSearchPageUI(movies.results, query, {
        pageNum: 1,
        totalPages: pageManager.totalPages,
      });
    } else {
      setParams("");
      movieList.innerHTML = "";
      addMoviePost(movies.results, movieList);
    }
  } catch (error) {
    showErrorPage();
  }
}

async function initAddMoreMoviesButton(movieList: HTMLElement) {
  if (pageManager.totalPages === 1) return;

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
