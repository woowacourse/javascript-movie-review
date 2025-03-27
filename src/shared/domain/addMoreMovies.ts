import { getMovieList } from "../../features/movie/api/getMovieList";
import { getSearchedPost } from "../../features/search/api/getSearchedPost";
import { addMoviePost } from "../ui/renderers/addMoviePost";
import { disableMoreButton } from "../ui/renderers/disabledMoreButton";
import { showErrorPage } from "../ui/renderers/showErrorPage";
import { getParams } from "./getParams";
import { setParams } from "./setParams";

export async function addMoreMovies($movieList: HTMLElement) {
  const { query, currentPage, nextPage } = getParams(
    new URL(window.location.href)
  );
  setParams(query ?? "", nextPage);

  const movies = await getCurrentMovieList(nextPage, query);

  if (!movies) return;
  addMoviePost(movies.results, $movieList);
  disableMoreButton(movies.total_pages, currentPage, movies.results);
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
