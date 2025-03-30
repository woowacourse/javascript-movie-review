import { getMovieList } from "../../features/movie/api/getMovieList";
import { getSearchedPost } from "../../features/search/api/getSearchedPost";
import { addMoviePost } from "../ui/renderers/addMoviePost";
import { disableMoreButton } from "../ui/renderers/disabledMoreButton";
import { showErrorPage } from "../ui/renderers/showErrorPage";
import { getQueryParam } from "./getParams";
import { pageManager } from "./pageManager";

export async function addMoreMovies($movieList: HTMLElement) {
  const query = getQueryParam(new URL(window.location.href));
  const currentPage = pageManager.currentPage;
  const nextPage = currentPage + 1;

  const movies = await getCurrentMovieList(nextPage, query);

  if (!movies) return;
  addMoviePost(movies.results, $movieList);
  disableMoreButton(pageManager.totalPages, currentPage, movies.results);

  pageManager.incrementCurrentPage();
}

async function getCurrentMovieList(page: number, query: string | null) {
  try {
    if (query) {
      return await getSearchedPost(query, page);
    }

    return await getMovieList({ page });
  } catch (error) {
    showErrorPage();
  }
}
