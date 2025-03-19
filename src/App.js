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
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "영화 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요."
        );
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      alert(error.message);
      return [];
    }
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

    const $moreButton = this.#$target.querySelector(".primary.more");
    $moreButton.addEventListener("click", async () => {
      const newMovies = await this.#fetchMovies(this.#movies.length / 20 + 1);
      const $movieList = this.#$target.querySelector(".thumbnail-list");

      const template = document.createElement("template");
      template.innerHTML = newMovies.map(MovieItem).join("");
      $movieList.append(template.content);

      this.#movies = [...this.#movies, ...newMovies];

      if (this.#movies.length / 20 >= 500) {
        $moreButton.style.display = "none";
      }
    });
    const $searchForm = this.#$target.querySelector("#search-form");
    $searchForm.addEventListener("submit", async () => {});
  }
}

export default App;
