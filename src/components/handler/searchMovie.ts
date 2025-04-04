import { partial } from "@zoeykr/function-al";
import { fetchSearchMovieList } from "../../api/fetchSearchMovieList";
import LoadMoreSection from "../movie/LoadMoreSection";
import MovieList from "../movie/MovieList";
import NoSearchResults from "../movie/NoSearchResults";
import hideSkeleton from "../utils/hideSkeleton";
import showSkeleton from "../utils/showSkeleton";
import { $ } from "../../utils/dom";
import observeLoadMore from "../../feature/observeLoadMore";

const INITIAL_PAGE = 1;

const searchMovie = async (input: string) => {
  const thumbnailList = $(".thumbnail-list");
  thumbnailList.replaceChildren();

  $(".no-result")?.remove();
  $(".load-more")?.remove();
  $("#caption").innerText = `"${input}" 검색 결과`;

  showSkeleton();
  const movies = await fetchSearchMovieList(input, INITIAL_PAGE);

  if (movies.status === "fail") {
    thumbnailList.before(NoSearchResults("영화 목록을 가져오지 못했습니다."));
  }

  if (movies.status === "success") {
    $(".top-rated-container").classList.add("hidden");
    $(".overlay-img").classList.add("hidden");

    MovieList(movies.data);
    hideSkeleton();

    if (movies.data.page === movies.data.total_pages) return;

    thumbnailList.after(LoadMoreSection());

    const loadFn = partial(fetchSearchMovieList, input);
    observeLoadMore({
      loadFn: loadFn,
    });
  }
};

export default searchMovie;
