import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import Tab from "./components/Tab";

const App = (): string => {
  return /*html*/ `
    ${Header()}
    <div class="container">
      ${Tab()}
      <main>
        ${MovieList()}
      </main>
    </div>
    ${Footer()}
  `;
};

const root = document.querySelector("#wrap");
if (root) {
  root.innerHTML = App();
}
