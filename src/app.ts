import Header from "./components/Header";
import ViewContainer from "./components/ViewContainer";

export const $main = document.querySelector("main");

async function App() {
  const $app = document.querySelector("#app");

  $app?.prepend(Header());
  await ViewContainer();
}

export default App;
