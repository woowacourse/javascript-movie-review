import { getMovieList } from "../../features/movie/api/getMovieList";
import { getSearchedPost } from "../../features/search/api/getSearchedPost";
import { addMoviePost } from "../ui/addMoviePost";
import { disableMoreButton } from "../ui/disabledMoreButton";

export async function addMoreMovies($movieList: HTMLElement) {
  const params = new URLSearchParams(window.location.search);
  const pageStr = params.get("page");
  const query = params.get("query");
  const pageNum = pageStr ? parseInt(pageStr) : 1;

  if (!pageStr) {
    params.append("page", "2");
  } else {
    params.set("page", (pageNum + 1).toString());
  }

  if (query) {
    const searchedMovies = await getSearchedPost(query, pageNum);

    addMoviePost(searchedMovies.results, $movieList);
    disableMoreButton(
      searchedMovies.total_pages,
      pageNum,
      searchedMovies.results
    );
  } else {
    const movies = await getMovieList({ page: pageNum });

    addMoviePost(movies.results, $movieList);
    disableMoreButton(movies.total_pages, pageNum, movies.results);
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
}
