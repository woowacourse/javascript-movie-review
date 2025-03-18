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
    console.log(data);

    if (data !== null) {
      this.#movies = data.results;
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

      body.append($header);

      if (this.#isLoad) {
        body.appendChild($div);
      } else {
        body.appendChild($movieListSection);
      }
      body.append($moreButton, $footer);
    }
  }
}

export default App;
