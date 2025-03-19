import TitleSearchBar from "./UI/TitleSearchBar/TitleSearchBar";
import Thumbnail from "./UI/Thumbnail/Thumbnail";
import MovieListSection from "./UI/MovieListSection/MovieListSection";
import Button from "./UI/Button/Button";
import Footer from "./UI/Footer/Footer";
import { getPopularityMovie } from "./Domain/getPopularityMovie";

// const movieData = await getPopularityMovie(1);

// let result = [];
// if (movieData) {
//   result = movieData.results.map((movie) => ({
//     ...movie,
//     poster_path: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
//   }));
// }

class App {
  #movies;
  #isLoad;
  #page;

  constructor() {
    this.#movies = [];
    this.#isLoad = false;
    this.#page = 1;
  }

  async init() {
    const data = await getPopularityMovie(1);

    const result = data.results.map((movie) => ({
      ...movie,
      poster_path: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      vote_average: movie.vote_average.toFixed(1),
    }));

    if (data !== null) {
      this.#movies = result;
      this.setIsLoad();
    }
  }

  setIsLoad() {
    this.#isLoad = !this.#isLoad;
    this.render();
  }

  render() {
    const body = document.querySelector("body");

    const $wrap = document.createElement("div");
    $wrap.id = "wrap";

    const $header = new TitleSearchBar().render();

    const $container = document.createElement("div");
    $container.classList.add("container");
    const $main = document.createElement("main");

    if (this.#movies.length !== 0) {
      const $thumbnail = new Thumbnail(this.#movies[0]).render();

      const $movieListSection = new MovieListSection(
        "지금 인기 있는 영화",
        this.#movies
      ).render();

      const $moreButton = new Button().render();

      const $footer = new Footer().render();

      const $div = document.createElement("div");
      $div.textContent = "로딩중";
      body.innerHTML = "";

      $wrap.append($thumbnail);
      $wrap.append($header);

      if (this.#isLoad) {
        $main.appendChild($movieListSection);
      } else {
        $main.appendChild($div);
      }

      $main.appendChild($moreButton);

      $container.appendChild($main);
      $wrap.appendChild($container);

      body.appendChild($wrap);
      body.appendChild($footer);
    }
  }
}

export default App;
