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
    const result = await this.getMoviesResults(); // 로딩이 t -> f

    this.setMovies([...this.#movies, ...result]); // 새로운 영화목록 반영 UI 렌더
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
    console.log("this.로딩", this.#isLoading);

    const body = document.querySelector("body");
    body.innerHTML = "";

    const $wrap = document.createElement("div");
    $wrap.id = "wrap";

    const $header = new TitleSearchBar().render();

    const $container = document.createElement("div");
    $container.classList.add("container");
    const $main = document.createElement("main");

    const $thumbnail = new Thumbnail(this.#movies[0]).render();

    // 제거해주는부분
    const $movieListSection = new MovieListSection(
      "지금 인기 있는 영화",
      this.#movies,
      this.#isLoading
    ).render();

    body.appendChild($wrap);

    $wrap.append($thumbnail);
    $wrap.append($header);
    // const $moreButton = new Button().render();

    // const $footer = new Footer().render();

    // if (this.#movies.length !== 0) {
    // const $thumbnail = new Thumbnail(this.#movies[0]).render();

    // const $movieListSection = new MovieListSection(
    //   "지금 인기 있는 영화",
    //   this.#movies
    // ).render();

    const $moreButton = new Button().render();

    // const $div = document.createElement("div");
    // $div.textContent = "로딩중";
    // body.innerHTML = "";

    // // $wrap.append($thumbnail);
    // // $wrap.append($header);

    // if (this.#isLoading) {
    //   $main.appendChild($div); // Todo: 스켈레톤 UI로 변경
    // } else {
    //   $main.appendChild($movieListSection);
    // }
    $main.appendChild($movieListSection);
    $main.appendChild($moreButton);
    $container.appendChild($main);
    $wrap.appendChild($container);

    $moreButton.addEventListener("click", this.handleButtonClick);
    // }

    const $footer = new Footer().render();
    body.appendChild($footer);
  }

  handleButtonClick = async () => {
    this.#page += 1;
    const results = await this.getMoviesResults(); // t-> f

    console.log("버튼클릭 - 로딩", this.#isLoading);
    this.setMovies([...this.#movies, ...results]); //
  };
}

export default App;
