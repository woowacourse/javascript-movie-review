import { getMovieList } from "../../features/movie/api/getMovieList";
import { getSearchedPost } from "../../features/search/api/getSearchedPost";
import { addMoviePost } from "../ui/addMoviePost";
import { disableMoreButton } from "../ui/disabledMoreButton";
import { showErrorPage } from "../ui/showErrorPage";

export async function addMoreMovies($movieList: HTMLElement) {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query") ?? null;
  const pageStr = params.get("page");
  const currentPage = pageStr ? parseInt(pageStr) : 1;
  const nextPage = currentPage + 1;

  if (!pageStr) return;

  params.set("page", nextPage.toString());
  const movies = await getCurrentMovieList(nextPage, query);

  if (!movies) return;
  addMoviePost(movies.results, $movieList);
  disableMoreButton(movies.total_pages, currentPage, movies.results);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
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
