import { addMoviePost } from "../ui/renderers/addMoviePost";
import { disableMoreButton } from "../ui/renderers/disabledMoreButton";
import { getQueryParam } from "../utils/getParams";
import { pageManager } from "./pageManager";
import { getCurrentMovieList } from "./getCurrentMovieList";

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
