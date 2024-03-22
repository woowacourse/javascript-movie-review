import Header from "./components/Header";
import ItemView from "./components/MovieListContainer";
import SkeletonListContainer from "./components/SkeletonListContainer";
import dataStateStore from "./model/DataStateStore";
import DataFetcher from "./service/DataFetcher";

async function App() {
  const $app = document.querySelector("#app");
  $app?.prepend(Header());
  SkeletonListContainer();
  await DataFetcher.handleGetPopularMovieData();
  ItemView("지금 인기 있는 영화", dataStateStore.movieData, "popular");
}

export default App;
