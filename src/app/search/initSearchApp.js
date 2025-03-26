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

const movieItemList = MovieItemList();
const loadMoreButton = LongButton("더보기");

export function initSearchApp() {
  mountSearchTitle();
  mountMovieItemList(movieItemList);
  mountLoadMoreButton(loadMoreButton);

  const query = getSearchParams("query");
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

function getSearchParams(key) {
  return new URLSearchParams(window.location.search).get(key) || "";
}
