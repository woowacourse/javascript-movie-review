import Header from "./components/Header";
import ItemView from "./components/ItemView";
import apiClient from "./model/APIClient";
import dataStateStore from "./model/DataStateStore";

async function App() {
  await apiClient.getPopularMovieData(true);

  const $app = document.querySelector("#app");
  const $header = Header();
  $app?.prepend($header);
  ItemView(
    "지금 인기 있는 영화",
    dataStateStore.movieData.movieList,
    "popular",
  );
}

export default App;
