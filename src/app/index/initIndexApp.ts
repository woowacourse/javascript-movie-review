import mountHeader from "../mount/mountHeader";
import mountMovieItemList from "../mount/mountMovieItemList";
import mountLoadMoreButton from "../mount/mountLoadMoreButton";
import { URLS } from "../../setting/settings";
import MovieItemList from "../../components/movieItemList/movieItemList";
import LoadMoreButton from "../../components/longButton/longButton";
import mountHero from "../mount/mountHero";
import type { MovieItemListInstance } from "../../../types/components";
import { hideSkeleton, showSkeleton } from "../../service/skeleton";
import { hideElement } from "../../view/InputView";
import { $ } from "../../util/querySelector";
import createMovieLoader from "../../service/createMovieLoader";

const movieItemList: MovieItemListInstance = MovieItemList();

export async function initIndexApp() {
  const loader = createMovieLoader(URLS.popularMovieUrl);
  const $loadMoreButton = LoadMoreButton({
    text: "더보기",
    onClick: () => loadAndDisplayMovies({ loader }),
  });

  mountIndexPageUI($loadMoreButton);
  await loadAndDisplayMovies({ loader });
}

async function loadAndDisplayMovies({ loader }: any) {
  showSkeleton();
  const { results, isLastPage } = await loader();
  hideSkeleton();

  if (isLastPage) hideElement($("#load-more"));
  movieItemList.render(results);
}

function mountIndexPageUI($loadMoreButton: HTMLButtonElement) {
  mountHeader();
  mountHero();
  mountMovieItemList(movieItemList);
  mountLoadMoreButton($loadMoreButton);
}
