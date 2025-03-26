import { getMovieList } from "../../features/movie/api/getMovieList";
import { getSearchedPost } from "../../features/search/api/getSearchedPost";
import { addMoviePost } from "../ui/addMoviePost";
import { disableMoreButton } from "../ui/disabledMoreButton";

export async function addMoreMovies($movieList: HTMLElement) {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  const query = params.get("query");

  if (!page) {
    params.append("page", "2");
  } else {
    params.set("page", (parseInt(page) + 1).toString());
  }

  if (query) {
    const searchedMovies = await getSearchedPost(
      query as string,
      parseInt(params.get("page")!)
    );

    addMoviePost(searchedMovies.results, $movieList);
    disableMoreButton(
      searchedMovies.total_pages,
      parseInt(params.get("page")!),
      searchedMovies.results
    );
  } else {
    const movies = await getMovieList({ page: parseInt(params.get("page")!) });

    addMoviePost(movies.results, $movieList);
    disableMoreButton(
      movies.total_pages,
      parseInt(params.get("page")!),
      movies.results
    );
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
}
