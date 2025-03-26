import { getMovieList } from "./features/movie/api/getMovieList";
import Header from "./shared/ui/components/Header";
import { CustomButton } from "./shared/ui/components/CustomButton";
import { addMoreMovies } from "./shared/ui/movies/addMoreMovies";
import { searchFormSubmitHandler } from "./features/search/ui/searchFormSubmitHandler";
import { addMovieCard } from "./shared/ui/movies/addMovieCard";
import MoreMoviesButton from "./shared/ui/components/MoreMoviesButton";
import ErrorPage from "./shared/ui/components/ErrorPage";
import { withSkeleton } from "./shared/ui/skeletons/withSkeleton";
import { initUrl } from "./shared/utils/updateUrl";
import { movieDetailModalHandler } from "./shared/ui/detailModal/movieDetailModalHandler";

async function init() {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;

  if (!$movieList) {
    ErrorPage("영화 리스트를 불러오는데 실패하였습니다.");
    return;
  }

  initUrl();

  const $movieContainer = document.getElementById("movie-container");
  const addMoreMoviesButton = CustomButton({
    title: "더보기",
    className: "add-more-button",
  });
  addMoreMoviesButton.id = "more-movies-button";
  $movieContainer?.appendChild(addMoreMoviesButton);

  const $moreMoviesButton = MoreMoviesButton();
  $moreMoviesButton?.addEventListener("click", async () => {
    withSkeleton($movieList, addMoreMovies($movieList));
  });

  try {
    const movies = await withSkeleton($movieList, getMovieList({ page: 1 }));
    if (movies) {
      Header(movies.results[0]);
      addMovieCard(movies.results, $movieList);
    }
  } catch (error) {
    ErrorPage("영화 리스트를 불러오는데 실패하였습니다.");
  }

  const searchForm = document.querySelector(".search-form");

  searchForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await searchFormSubmitHandler(e);
    } catch (error) {
      ErrorPage("영화 리스트를 불러오는데 실패하였습니다.");
    }
  });

  movieDetailModalHandler();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
