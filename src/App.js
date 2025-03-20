import Footer from "./components/Footer.js";
import Banner from "./components/Banner/index.js";
import MovieList from "./components/MovieList/index.js";
import Header from "./components/Header/index.js";
import MovieItem from "./components/MovieList/MovieItem.js";
import SkeletonMovieItem from "./components/MovieList/SkeletonMovieItem.js";
import { fetchPopularMovies, fetchSearchedMovies } from "./APIs/movieAPI.js";

class App {
  #$target;
  #movies = [];
  #query = "";
  #searchedMoviesLength = 0;

  constructor($target) {
    this.#$target = $target;

    this.#init();
  }

  async #init() {
    this.#movies = await fetchPopularMovies();
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

  async #handlePopularMoviesMore($moreButton) {
    const $movieList = this.#$target.querySelector("#movie-list");

    const skeletonCount = 20;
    const skeletonTemplate = document.createElement("template");
    skeletonTemplate.innerHTML = new Array(skeletonCount)
      .fill(null)
      .map(() => SkeletonMovieItem())
      .join("");
    $movieList.appendChild(skeletonTemplate.content);

    const newMovies = await fetchPopularMovies(this.#movies.length / 20 + 1);

    const skeletons = $movieList.querySelectorAll(".skeleton-item");
    skeletons.forEach((skeleton) => skeleton.remove());

    const template = document.createElement("template");
    template.innerHTML = newMovies.map(MovieItem).join("");
    $movieList.append(template.content);

    this.#movies = [...this.#movies, ...newMovies];

    if (this.#movies.length / 20 >= 500) {
      $moreButton.remove();
    }
  }

  async #handleSearchedMoviesMore($moreButton) {
    const $movieList = this.#$target.querySelector("#movie-list");

    const skeletonCount = 20;
    const skeletonTemplate = document.createElement("template");
    skeletonTemplate.innerHTML = new Array(skeletonCount)
      .fill(null)
      .map(() => SkeletonMovieItem())
      .join("");
    $movieList.appendChild(skeletonTemplate.content);

    const newMovies = await fetchSearchedMovies(this.#movies.length / 20 + 1);

    const skeletons = $movieList.querySelectorAll(".skeleton-item");
    skeletons.forEach((skeleton) => skeleton.remove());

    const template = document.createElement("template");
    template.innerHTML = newMovies.results.map(MovieItem).join("");
    $movieList.append(template.content);

    this.#movies = [...this.#movies, ...newMovies.results];

    if (this.#movies.length >= this.#searchedMoviesLength) {
      $moreButton.remove();
    }
  }

  #mount() {
    const $Banner = this.#$target.querySelector("#Banner");
    $Banner.style.backgroundImage = `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${
      this.#movies[0].backdrop_path
    })`;

    window.addEventListener("scroll", () => {
      const $header = this.#$target.querySelector("header");
      if (window.scrollY > 0) {
        $header.classList.add("scrolled");
        return;
      }
      $header.classList.remove("scrolled");
    });

    const $moreButton = this.#$target.querySelector("#more-button");
    $moreButton.addEventListener("click", () => {
      this.#query
        ? this.#handleSearchedMoviesMore($moreButton)
        : this.#handlePopularMoviesMore($moreButton);
    });

    const $searchForm = this.#$target.querySelector("#search-form");
    $searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const { query } = Object.fromEntries(formData.entries());
      this.#query = query;

      const searchedMovies = await fetchSearchedMovies(this.#query);

      const $Banner = this.#$target.querySelector("#Banner");
      if ($Banner) {
        $Banner.remove();
      }
      const $movieList = this.#$target.querySelector("#movie-list");

      const $title = this.#$target.querySelector("#list-title");
      $title.textContent = `"${this.#query}" 검색 결과`;

      this.#searchedMoviesLength = searchedMovies.total_results;

      if (this.#searchedMoviesLength === 0) {
        const template = document.createElement("template");
        template.innerHTML = /* html */ `
          <div></div>
          <div></div>
          <div class="center">
            <img src="./images/not_found.png"/>
            <h2 data-testid='no-result-message'>검색 결과가 없습니다.</h2>
          </div>
        `;
        $movieList.replaceChildren(template.content);
        $moreButton.remove();
        return;
      }

      const template = document.createElement("template");
      template.innerHTML = searchedMovies.results.map(MovieItem).join("");
      $movieList.replaceChildren(template.content);

      this.#movies = searchedMovies.results;

      if (this.#movies.length >= this.#searchedMoviesLength) {
        $moreButton.remove();
      }

      $searchForm.reset();
    });
  }
}

export default App;
