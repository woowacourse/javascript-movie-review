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

// 컴포넌트 인스턴스 타입 선언
const movieItemList: MovieItemListInstance = MovieItemList();
const loadMoreButton: LongButtonInstance = LongButton("더보기");

export function initSearchApp(): void {
  mountSearchTitle();
  mountMovieItemList(movieItemList);
  mountLoadMoreButton(loadMoreButton);

  const query: string = getSearchParams("query");

  const loader = createMovieLoader(
    URLS.searchMovieUrl,
    defaultQueryObject,
    defaultOptions,
    query
  );

  const load = () => loadSearchMovie(loader, movieItemList, loadMoreButton);

  load();
  loadMoreButton.setOnClick(load);
}

// 쿼리 파라미터 가져오는 함수에 명확한 타입 추가
function getSearchParams(key: string): string {
  return new URLSearchParams(window.location.search).get(key) ?? "";
}
