import { getMovieList } from "../../../features/movie/api/getMovieList";
import { getSearchedMovie } from "../../../features/search/api/getSearchedMovie";
import { addMovieCard } from "./addMovieCard";
import { disableMoreButton } from "./disabledMoreButton";
import { getUrlParams } from "../../utils/getUrlParams";

export async function addMoreMovies($movieList: HTMLElement) {
  const params = getUrlParams();
  const page = params.get("page");
  const query = params.get("query");

  if (!page) {
    params.append("page", "2");
  } else {
    params.set("page", (parseInt(page) + 1).toString());
  }

  if (query) {
    const searchedMovies = await getSearchedMovie(
      query as string,
      parseInt(params.get("page")!)
    );

    if (!searchedMovies) {
      return;
    }
    addMovieCard(searchedMovies.results, $movieList);
    disableMoreButton(
      searchedMovies.total_pages,
      parseInt(params.get("page")!)
    );
  } else {
    const movies = await getMovieList({ page: parseInt(params.get("page")!) });

    if (!movies) {
      return;
    }
    addMovieCard(movies.results, $movieList);
    disableMoreButton(movies.total_pages, parseInt(params.get("page")!));
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
}
