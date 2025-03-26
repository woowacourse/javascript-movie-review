import mountHeader from "../mount/mountHeader";
import mountMovieItemList from "../mount/mountMovieItemList";
import mountLoadMoreButton from "../mount/mountLoadMoreButton";
import createMovieLoader from "../../service/createMovieLoader";
import loadMovies from "../../service/loadMovies";
import {
  URLS,
  defaultOptions,
  defaultQueryObject,
} from "../../setting/settings";
import MovieItemList from "../../components/movieItemList/movieItemList";
import LongButton from "../../components/longButton/longButton";
import mountHero from "../mount/mountHero";

const movieItemList = MovieItemList();
const loadMoreButton = LongButton("더보기");

export function initApp() {
  mountHeader();
  mountHero();
  mountMovieItemList(movieItemList);
  mountLoadMoreButton(loadMoreButton);

  const loader = createMovieLoader(
    URLS.popularMovieUrl,
    defaultQueryObject,
    defaultOptions
  );
  const load = () => loadMovies(loader, movieItemList, loadMoreButton);

  loadMoreButton.setOnClick(load);
  load();
}
