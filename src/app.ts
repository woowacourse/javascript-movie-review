import Header from "./components/Header";
import ItemView from "./components/ItemView";
import movieList from "./movieList";

function App() {
  const $app = document.querySelector("#app");

  const $header = Header();
  $app?.prepend($header);
  ItemView({ movieList, isShowMoreButton: true });
}

export default App;
