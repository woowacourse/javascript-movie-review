import mountSearchTitle from "../mount/mountSearchTitle";
import mountMovieItemList from "../mount/mountMovieItemList";
import MovieItemList from "../../components/movieItemList/movieItemList";
import { URLS } from "../../setting/settings";
import type { MovieItemListInstance } from "../../../types/components";
import { showSkeleton, hideSkeleton } from "../../service/skeleton";
import { $ } from "../../util/querySelector";
import Fallback from "../../components/fallback/fallback";
import createMovieLoader from "../../service/createMovieLoader";

const movieItemList: MovieItemListInstance = MovieItemList();
let observer: IntersectionObserver;

export async function initSearchApp(): Promise<void> {
  const query: string = getSearchParams("query");
  const loader = createMovieLoader(URLS.searchMovieUrl, query);

  mountIndexPageUI();
  await loadAndDisplayMovies({ loader });

  registerObserver({ loader });
}

function getSearchParams(key: string): string {
  return new URLSearchParams(window.location.search).get(key) ?? "";
}

function registerObserver({ loader }: any) {
  observer = new IntersectionObserver(async ([entry]) => {
    if (entry.isIntersecting) {
      await loadAndDisplayMovies({ loader });
    }
  });

  const sentinel = $("#sentinel");
  if (sentinel) {
    observer.observe(sentinel);
  }
}

async function loadAndDisplayMovies({ loader }: any) {
  try {
    showSkeleton();
    const { results, isLastPage } = await loader();
    hideSkeleton();

    if (isLastPage && observer) {
      observer.disconnect();
    }

    movieItemList.render(results);
  } catch {
    showFallback();
  }
}

function showFallback(): void {
  $("#thumbnail-container")?.replaceChildren(Fallback());
}

function mountIndexPageUI() {
  mountSearchTitle();
  mountMovieItemList(movieItemList);
}
