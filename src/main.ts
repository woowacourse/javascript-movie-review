import { getMovieList } from "./features/movie/api/getMovieList";
import Header from "./features/movie/ui/components/Header";
import { searchFormSubmitHandler } from "./features/search/ui/searchFormSubmitHandler";
import { addMovieCard } from "./features/movie/ui/addMovieCard";
import ErrorModal from "./shared/ui/components/ErrorModal";
import { withSkeleton } from "./features/skeleton/ui/withSkeleton";
import { initUrl } from "./shared/utils/updateUrl";
import { movieDetailModalHandler } from "./features/detailModal/ui/movieDetailModalHandler";
import { intersectionObserver } from "./shared/ui/intersectionObserver/intersectionObserver";
import { addMoreMovies } from "./features/movie/ui/addMoreMovies";

async function init() {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;

  if (!$movieList) {
    ErrorModal("영화 리스트를 불러오는데 실패하였습니다.");
    return;
  }

  initUrl();

  try {
    const movieLists = await withSkeleton(
      $movieList,
      getMovieList({ page: 1 })
    );
    if (movieLists) {
      const movies = movieLists.results.map((movieList) => {
        const { id, title, poster_path, vote_average } = movieList;
        return {
          id,
          title,
          poster_path,
          vote_average,
        };
      });
      Header(movies[0]);
      addMovieCard(movies, $movieList);
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

  intersectionObserver(() =>
    withSkeleton($movieList, addMoreMovies($movieList))
  );

  movieDetailModalHandler();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
