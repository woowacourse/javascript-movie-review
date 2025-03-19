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
  #isLoading;
  #page;

  constructor() {
    this.#movies = [];
    this.#isLoading = false;
    this.#page = 1;
  }

  async init() {
    const result = await this.getMoviesResults();

    this.setMovies([...this.#movies, ...result]);
  }

  async getMoviesResults() {
    this.setIsLoading(true);

    const data = await getPopularityMovie(this.#page);

    if (data !== null) {
      this.setIsLoading(false);

      return data.results.map((movie) => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
        vote_average: movie.vote_average.toFixed(1),
      }));
    }

    return [];
  }

  setMovies(newMovies) {
    this.#movies = newMovies;
    this.render();
  }

  setIsLoading(isLoading) {
    this.#isLoading = isLoading;
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

      if (this.#isLoading) {
        $main.appendChild($div); // Todo: 스켈레톤 UI로 변경
      } else {
        $main.appendChild($movieListSection);
      }

      $main.appendChild($moreButton);

      $container.appendChild($main);
      $wrap.appendChild($container);

      body.appendChild($wrap);
      body.appendChild($footer);

      $moreButton.addEventListener("click", this.handleButtonClick);
    }
  }

  handleButtonClick = async () => {
    this.#page += 1;
    const results = await this.getMoviesResults();

    this.setMovies([...this.#movies, ...results]);
  };
}

export default App;
