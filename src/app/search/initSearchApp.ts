import mountSearchTitle from "../mount/mountSearchTitle";
import mountMovieItemList from "../mount/mountMovieItemList";
import mountLoadMoreButton from "../mount/mountLoadMoreButton";
import LoadMoreButton from "../../components/longButton/longButton";
import MovieItemList from "../../components/movieItemList/movieItemList";
import { URLS } from "../../setting/settings";
import type { MovieItemListInstance } from "../../../types/components";
import { showSkeleton, hideSkeleton } from "../../service/skeleton";
import { hideElement } from "../../view/InputView";
import { $ } from "../../util/querySelector";
import Fallback from "../../components/fallback/fallback";
import createMovieLoader from "../../service/createMovieLoader";

const movieItemList: MovieItemListInstance = MovieItemList();

export async function initSearchApp(): Promise<void> {
  const query: string = getSearchParams("query");
  const loader = createMovieLoader(URLS.searchMovieUrl, query);

  const $loadMoreButton = LoadMoreButton({
    text: "더보기",
    onClick: async () => await searchAndDisplayMovies({ loader }),
  });

  mountIndexPageUI($loadMoreButton);
  await searchAndDisplayMovies({ loader });
}

function getSearchParams(key: string): string {
  return new URLSearchParams(window.location.search).get(key) ?? "";
}

async function searchAndDisplayMovies({ loader }: any) {
  try {
    showSkeleton();
    const { results, isLastPage } = await loader();
    hideSkeleton();

    if (isLastPage) hideElement($("#load-more"));
    movieItemList.render(results);
  } catch {
    showFallback();
  }
}

function showFallback(): void {
  $("#thumbnail-container")?.replaceChildren(Fallback());
}

function mountIndexPageUI(loadMoreButton: HTMLButtonElement) {
  mountSearchTitle();
  mountMovieItemList(movieItemList);
  mountLoadMoreButton(loadMoreButton);
}
