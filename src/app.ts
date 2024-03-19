import Header from "./components/Header";

function App() {
  const $app = document.querySelector("#app");

  const $header = Header();
  $app?.appendChild($header);
}

export default App;
