import Header from "./components/Header";
import MovieList from "./components/MovieList";

const App = () => {
  return `
  <header>${Header()}</header>
  <main>${MovieList("popular")}</main>
`;
};

export default App;
