import mountHeader from "../mount/mountHeader";
import mountMovieItemList from "../mount/mountMovieItemList";
import { URLS } from "../../setting/settings";
import MovieItemList from "../../components/movieItemList/movieItemList";
import mountHero from "../mount/mountHero";
import type { MovieItemListInstance } from "../../../types/components";
import { hideSkeleton, showSkeleton } from "../../service/skeleton";
import createInfiniteQuery from "../../service/createInfiniteQuery";
import { TMDBResponse } from "../../../types/TMDB";
import fetchWithErrorHandling from "../../util/fetchWithErrorHandling";
import { registerObserver, releaseObserver } from "../../util/observer";

const SENTINEL_SELECTOR = "#sentinel";

const movieItemList: MovieItemListInstance = MovieItemList();
const fetchPopularMovies = createInfiniteQuery<TMDBResponse>(
  URLS.popularMovieUrl
);

export async function initIndexApp() {
  registerObserver({
    callback: loadAndDisplayMovies,
    sentinel: SENTINEL_SELECTOR,
  });

  mountIndexPageUI();

  await loadAndDisplayMovies();
}

function mountIndexPageUI() {
  mountHeader();
  mountHero();
  mountMovieItemList(movieItemList);
}

async function loadAndDisplayMovies() {
  const { results, page: currentPage, total_pages } = await loadPopularMovies();

  if (total_pages <= currentPage) {
    releaseObserver({ sentinel: SENTINEL_SELECTOR });
  }

  movieItemList.render(results);
}

async function loadPopularMovies() {
  showSkeleton();
  const data = await fetchWithErrorHandling<TMDBResponse>(fetchPopularMovies);
  hideSkeleton();

  return data;
}
