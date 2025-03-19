import Header from "./UI/Header/Header";
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
    }));

    if (data !== null) {
      this.#movies = result;
      this.setIsLoad();
    }
  }

  setIsLoad() {
    this.#isLoad = !this.#isLoad;
    console.log(this.#isLoad);
    this.render();
  }

  render() {
    console.log(this.#isLoad);
    const body = document.querySelector("body");
    const $wrap = document.createElement("div");
    $wrap.id = "wrap";

    const $header = new Header().render();
    console.log(this.#movies);

    if (this.#movies.length !== 0) {
      const $thumbnail = new Thumbnail(this.#movies[0]).render();

      const $movieListSection = new MovieListSection(
        "인기순",
        this.#movies
      ).render();

      const $moreButton = new Button().render();

      const $footer = new Footer().render();

      const $div = document.createElement("div");
      $div.textContent = "로딩중";
      body.innerHTML = "";
      console.log($div);
      console.log($header);

      $wrap.append($header);

      if (this.#isLoad) {
        $wrap.appendChild($movieListSection);
      } else {
        $wrap.appendChild($div);
      }
      $wrap.append($moreButton, $footer);
      body.appendChild($wrap);
    }
  }
}

export default App;
