import ErrorView from "./components/ErrorView";
import Header from "./components/Header";
import ItemView from "./components/ItemView";
import SkeletonView from "./components/SkeletonList";
import dataStateStore from "./model/DataStateStore";
import { handleGetPopularMovieData } from "./service/handleSkeletonAndAPI";

async function App() {
  const $app = document.querySelector("#app");
  $app?.prepend(Header());
  SkeletonView();
  ErrorView();
  await handleGetPopularMovieData();
  ItemView("지금 인기 있는 영화", dataStateStore.movieData, "popular");
}

export default App;
