import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Banner from "./components/Banner/index.js";
import MovieList from "./components/MovieList/index.js";
import { fetchPopularMovies } from "./APIs/movieAPI.ts";
import Store from "./store/store.ts";

class App {
  #$target;
  #store;

  constructor($target) {
    this.#$target = $target;
    this.#store = new Store({
      movies: [],
      query: "",
      searchedMoviesLength: 0,
    });

    const $headerTemplate = document.createElement("template");
    $headerTemplate.innerHTML = Header(this.#store);
    this.#$target.appendChild($headerTemplate.content);

    this.bannerContainer = document.createElement("section");
    this.bannerContainer.id = "banner-container";
    this.#$target.appendChild(this.bannerContainer);

    this.mainContainer = document.createElement("div");
    this.mainContainer.classList.add("container");
    this.#$target.appendChild(this.mainContainer);

    const $footerTemplate = document.createElement("template");
    $footerTemplate.innerHTML = Footer();
    this.#$target.appendChild($footerTemplate.content);

    this.bannerComponent = new Banner(this.bannerContainer, this.#store);
    this.movieListComponent = new MovieList(this.mainContainer, this.#store);

    if (this.#store.getState().movies.length === 0) {
      this.loadPopularMovies();
    }
  }

  async loadPopularMovies() {
    const movies = await fetchPopularMovies((error) => alert(error.message));
    this.#store.setState({ movies });
  }
}

export default App;
