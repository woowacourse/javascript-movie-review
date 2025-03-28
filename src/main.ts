import { getMovieList } from "./features/movie/api/getMovieList";
import Header from "./shared/ui/components/Header";
import { searchFormSubmitHandler } from "./features/search/ui/searchFormSubmitHandler";
import { addMovieCard } from "./shared/ui/movies/addMovieCard";
import ErrorModal from "./shared/ui/components/ErrorModal";
import { withSkeleton } from "./shared/ui/skeletons/withSkeleton";
import { initUrl } from "./shared/utils/updateUrl";
import { movieDetailModalHandler } from "./shared/ui/detailModal/movieDetailModalHandler";
import { intersectionObserver } from "./shared/ui/intersectionObserver/intersectionObserver";

async function init() {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;

  if (!$movieList) {
    ErrorModal("영화 리스트를 불러오는데 실패하였습니다.");
    return;
  }

  initUrl();

  try {
    const movies = await withSkeleton($movieList, getMovieList({ page: 1 }));
    if (movies) {
      Header(movies.results[0]);
      addMovieCard(movies.results, $movieList);
    }
  } catch (error) {
    ErrorModal("영화 리스트를 불러오는데 실패하였습니다.");
  }

  const searchForm = document.querySelector(".search-form");

  searchForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await searchFormSubmitHandler(e);
    } catch (error) {
      ErrorModal("영화 리스트를 불러오는데 실패하였습니다.");
    }
  });

  intersectionObserver($movieList);

  movieDetailModalHandler();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
