import Footer from "./components/Footer.js";
import HeaderArea from "./components/HeaderArea/index.js";
import MovieList from "./components/MovieList/index.js";

class App {
  #$target;
  #movies = [];

  constructor($target) {
    this.#$target = $target;

    this.#init();
  }

  async #init() {
    this.#movies = await this.#fetchMovies();
    this.#$target.appendChild(this.#template());
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = /* html */ `
        <div id="wrap">
        ${HeaderArea()}

        <div class="container">
          ${MovieList(this.#movies)}
        </div>

        ${Footer()}
      </div>
    `;
    return template.content;
  }

  async #fetchMovies() {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data.results;
  }
}

export default App;
