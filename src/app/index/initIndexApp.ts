import mountHeader from "../mount/mountHeader";
import mountMovieItemList from "../mount/mountMovieItemList";
import { URLS } from "../../setting/settings";
import MovieItemList from "../../components/movieItemList/movieItemList";
import mountHero from "../mount/mountHero";
import type { MovieItemListInstance } from "../../../types/components";
import { hideSkeleton, showSkeleton } from "../../service/skeleton";
import { $ } from "../../util/querySelector";
import createMovieLoader from "../../service/createMovieLoader";

const movieItemList: MovieItemListInstance = MovieItemList();
let observer: IntersectionObserver;

export async function initIndexApp() {
  const loader = createMovieLoader(URLS.popularMovieUrl);

  mountIndexPageUI();
  await loadAndDisplayMovies({ loader });

  registerObserver({ loader });
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
  showSkeleton();
  const { results, isLastPage } = await loader();
  hideSkeleton();

  if (isLastPage && observer) {
    const sentinel = $("#sentinel");
    if (sentinel) observer.unobserve(sentinel);
    observer.disconnect();
  }

  movieItemList.render(results);
}

function mountIndexPageUI() {
  mountHeader();
  mountHero();
  mountMovieItemList(movieItemList);
}
