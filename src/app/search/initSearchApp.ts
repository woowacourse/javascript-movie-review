import mountSearchTitle from "../mount/mountSearchTitle";
import mountMovieItemList from "../mount/mountMovieItemList";
import LongButton from "../../components/longButton/longButton";
import MovieItemList from "../../components/movieItemList/movieItemList";
import mountLoadMoreButton from "../mount/mountLoadMoreButton";
import createMovieLoader from "../../service/createMovieLoader";
import {
  URLS,
  defaultOptions,
  defaultQueryObject,
} from "../../setting/settings";
import type { MovieItemListInstance } from "../../../types/components";
import { hideSkeleton, showSkeleton } from "../../service/skeleton";
import { $ } from "../../util/querySelector";
import { hideElement } from "../../view/InputView";

// 컴포넌트 인스턴스 타입 선언
const movieItemList: MovieItemListInstance = MovieItemList();

export async function initSearchApp(): Promise<void> {
  const query: string = getSearchParams("query");
  await searchAndDisplayMovies({ query });

  const { $el: LoadMoreButton } = LongButton("더보기", {
    onClick: () => searchAndDisplayMovies({ query }),
  });
  mountSearchTitle();
  mountMovieItemList(movieItemList);
  mountLoadMoreButton(LoadMoreButton);
}

// 쿼리 파라미터 가져오는 함수에 명확한 타입 추가
function getSearchParams(key: string): string {
  return new URLSearchParams(window.location.search).get(key) ?? "";
}

async function searchMovies({ query }: any) {
  return createMovieLoader(
    URLS.searchMovieUrl,
    defaultQueryObject,
    defaultOptions,
    query
  )();
}

const searchAndDisplayMovies = async ({ query }: any) => {
  showSkeleton();
  const { results, isLastPage } = await searchMovies({ query });
  hideSkeleton();

  if (isLastPage) hideElement($("#load-more"));
  movieItemList.render(results);
};
