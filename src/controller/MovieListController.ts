import { getPopularMovieResult } from "../api/getPopularMovieResult";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import MovieResults from "../domain/MovieResults";
import { IMovieResult } from "../types/movieResultType";

class MovieListController {
  movieResults;
  mainElement;

  constructor(mainElement: HTMLElement) {
    this.movieResults = MovieResults();
    this.mainElement = mainElement;
  }

  bindEvents() {
    const seeMoreElement = this.mainElement.querySelector(".see-more");
    seeMoreElement?.addEventListener("click", () => {
      this.addMovieList();
    });
  }

  async getPopularMovieList(page: number = 1) {
    const { page: newPage, results: movieList }: IMovieResult =
      await getPopularMovieResult(page);

    this.movieResults.addMovieList(newPage, movieList); // 도메인 업데이트

    return movieList;
  }

  async renderMovieList() {
    const movieList = await this.getPopularMovieList();
    const sectionElement = MovieListSection("지금 인기 있는 영화", movieList);

    this.mainElement.replaceChildren(sectionElement);
    this.bindEvents();
  }

  async renderExistingMovieList() {
    const movieList = this.movieResults.getMovieList();
    const sectionElement = MovieListSection("지금 인기 있는 영화", movieList);

    this.mainElement.replaceChildren(sectionElement);

    this.bindEvents();
  }

  async addMovieList() {
    const movieList = await this.getPopularMovieList(
      this.movieResults.getPage() + 1,
    );

    movieList.forEach((movie) => {
      this.mainElement.querySelector("ul")?.appendChild(MovieItem(movie));
    });
  }
}

export default MovieListController;
