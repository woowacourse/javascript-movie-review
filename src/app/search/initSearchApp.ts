import mountSearchTitle from "../mount/mountSearchTitle";
import mountMovieItemList from "../mount/mountMovieItemList";
import { loadSearchMovie } from "./loadSearchMovie";
import LongButton from "../../components/longButton/longButton";
import MovieItemList from "../../components/movieItemList/movieItemList";
import mountLoadMoreButton from "../mount/mountLoadMoreButton";
import createMovieLoader from "../../service/createMovieLoader";
import {
  URLS,
  defaultOptions,
  defaultQueryObject,
} from "../../setting/settings";
import type {
  LongButtonInstance,
  MovieItemListInstance,
} from "../../../types/components";
import { hideSkeleton, showSkeleton } from "../../service/skeleton";

// 컴포넌트 인스턴스 타입 선언
const movieItemList: MovieItemListInstance = MovieItemList();
const loadMoreButton: LongButtonInstance = LongButton("더보기");

async function searchMovies({ query }: any) {
  return createMovieLoader(
    URLS.searchMovieUrl,
    defaultQueryObject,
    defaultOptions,
    query
  )();
}

const loadSearchItems = async ({ query }: any) => {
  showSkeleton();
  const { results, isLastPage } = await searchMovies({ query });
  hideSkeleton();

  if (isLastPage) loadMoreButton.hide();
  movieItemList.render(results);
};

export async function initSearchApp(): Promise<void> {
  mountSearchTitle();
  mountMovieItemList(movieItemList);
  mountLoadMoreButton(loadMoreButton);

  const query: string = getSearchParams("query");

  await loadSearchItems({ query });
  loadMoreButton.setOnClick(() => loadSearchItems({ query }));
}

// 쿼리 파라미터 가져오는 함수에 명확한 타입 추가
function getSearchParams(key: string): string {
  return new URLSearchParams(window.location.search).get(key) ?? "";
}
