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
    this.#movies = await this.#fetchPopularMovies();
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

  async #fetchPopularMovies(page = 1) {
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
    const $Banner = this.#$target.querySelector("#Banner");
    $Banner.style.backgroundImage = `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${
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
      const newMovies = await this.#fetchPopularMovies(
        this.#movies.length / 20 + 1
      );
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
    $searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const { query } = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`,
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

        const $Banner = this.#$target.querySelector("#Banner");
        if ($Banner) {
          $Banner.remove();
        }

        const searchedMovies = await response.json();

        const $movieList = this.#$target.querySelector(".thumbnail-list");

        const template = document.createElement("template");
        template.innerHTML = searchedMovies.results.map(MovieItem).join("");
        $movieList.replaceChildren(template.content);

        this.#movies = searchedMovies.results;

        if (this.#movies.length >= searchedMovies.total_results) {
          $moreButton.style.display = "none";
        }
      } catch (error) {
        alert(error.message);
        return [];
      }
    });
  }
}

export default App;
