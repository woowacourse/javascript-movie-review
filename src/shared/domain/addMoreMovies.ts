import { addMoviePost } from "../ui/renderers/addMoviePost";
import { getQueryParam } from "../utils/getParams";
import { pageManager } from "./pageManager";
import { getCurrentMovieList } from "./getCurrentMovieList";

export async function addMoreMovies($movieList: HTMLElement) {
  try {
    const query = getQueryParam(new URL(window.location.href), "query");
    const nextPage = pageManager.currentPage + 1;

    const movies = await getCurrentMovieList(nextPage, query);

    if (!movies || !movies.results || movies.results.length === 0) {
      throw new Error("영화 데이터를 불러오지 못했습니다.");
    }

    addMoviePost(movies.results, $movieList);

    pageManager.incrementCurrentPage();
    pageManager.setTotalPages(movies.total_pages);

    return {
      success: true,
    };
  } catch (error) {
    return { success: false, error };
  }
}
