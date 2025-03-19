import Footer from "./components/Footer.js";
import Banner from "./components/Banner/index.js";
import MovieList from "./components/MovieList/index.js";
import Header from "./components/Header/index.js";
import MovieItem from "./components/MovieList/MovieItem.js";

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
    this.#mount();
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = /* html */ `
      <div id="wrap">
        ${Header()}
        ${Banner(this.#movies[0])}

        <div class="container">
          ${MovieList(this.#movies)}
        </div>

        ${Footer()}
      </div>
    `;
    return template.content;
  }

  async #fetchMovies(page = 1) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
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

  #mount() {
    const $background = this.#$target.querySelector(".background-container");
    $background.style.backgroundImage = `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${
      this.#movies[0].backdrop_path
    })`;

    window.addEventListener("scroll", () => {
      const $header = document.querySelector("header");
      if (window.scrollY > 0) {
        $header.classList.add("scrolled");
        return;
      }
      $header.classList.remove("scrolled");
    });
  }
}

export default App;
