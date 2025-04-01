import mountSearchTitle from "../mount/mountSearchTitle";
import mountMovieItemList from "../mount/mountMovieItemList";
import MovieItemList from "../../components/movieItemList/movieItemList";
import { defaultQueryObject, URLS } from "../../setting/settings";
import type { MovieItemListInstance } from "../../../types/components";
import { showSkeleton, hideSkeleton } from "../../service/skeleton";
import getSearchParams from "../../util/getSearchParams";
import { registerObserver, releaseObserver } from "../../util/observer";
import fetchWithErrorHandling from "../../util/fetchWithErrorHandling";
import { TMDBResponse } from "../../../types/TMDB";
import createInfiniteQuery from "../../service/createInfiniteQuery";

const SENTINEL_SELECTOR = "#sentinel";

const movieItemList: MovieItemListInstance = MovieItemList();
const fetchSearchMovies = createInfiniteQuery<TMDBResponse>(
  URLS.searchMovieUrl,
  {
    searchTerm: getSearchParams("query"),
  }
);

export async function initSearchApp() {
  registerObserver({
    callback: loadAndDisplayMovies,
    sentinel: SENTINEL_SELECTOR,
  });

  mountSearchPageUI();

  await loadAndDisplayMovies();
}

function mountSearchPageUI() {
  mountSearchTitle();
  mountMovieItemList(movieItemList);
}

async function loadAndDisplayMovies() {
  const { results, page: currentPage, total_pages } = await loadSearchMovies();

  if (total_pages <= currentPage) {
    releaseObserver({ sentinel: SENTINEL_SELECTOR });
  }

  movieItemList.render(results);
}

async function loadSearchMovies() {
  showSkeleton();
  const data = await fetchWithErrorHandling<TMDBResponse>(fetchSearchMovies);
  hideSkeleton();

  return data;
}
