import ErrorView from "./components/ErrorView";
import Header from "./components/Header";
import ItemView from "./components/ItemView";
import SkeletonList from "./components/SkeletonList";
import dataStateStore from "./model/DataStateStore";
import { handleGetPopularMovieData } from "./service/handleSkeletonAndAPI";

async function App() {
  const $app = document.querySelector("#app");
  $app?.prepend(Header());
  SkeletonList();
  ErrorView();
  await handleGetPopularMovieData();
  ItemView(
    "지금 인기 있는 영화",
    dataStateStore.movieData.movieList,
    "popular",
  );
}

export default App;
