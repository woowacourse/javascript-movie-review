import Footer from "./components/Footer.js";
import HeaderArea from "./components/HeaderArea/index.js";
import MovieList from "./components/MovieList/index.js";

class App {
  #$target;

  constructor($target) {
    this.#$target = $target;
    this.#$target.appendChild(this.#template());
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = /* html */ `
        <div id="wrap">
        ${HeaderArea()}

        <div class="container">
          ${MovieList()}
        </div>

        ${Footer()}
      </div>
    `;
    return template.content;
  }
}

export default App;
