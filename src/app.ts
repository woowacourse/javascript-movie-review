import Header from "./components/Header";
import ItemView from "./components/ItemView";
import SkeletonView from "./components/SkeletonList";
import dataStateStore from "./model/DataStateStore";
import { handleGetPopularMovieData } from "./service/fetchDataWidthSkeleton";

async function App() {
  const $app = document.querySelector("#app");
  $app?.prepend(Header());
  SkeletonView();
  await handleGetPopularMovieData();
  ItemView("지금 인기 있는 영화", dataStateStore.movieData, "popular");
}

export default App;
