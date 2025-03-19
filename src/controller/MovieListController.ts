import { getPopularMovieResult } from "../api/getPopularMovieResult";
import MovieItem from "../component/MovieItem";
import MovieResults from "../domain/MovieResults";
import { IMovieItem, IMovieResult } from "../types/movieResultType";

class MovieListController {
  movieResults;
  sectionElement;

  constructor(sectionElement: HTMLElement) {
    this.movieResults = MovieResults();
    this.sectionElement = sectionElement;
    this.bindEvents();
  }

  bindEvents() {
    const seeMoreElement = this.sectionElement.querySelector(".see-more");
    seeMoreElement?.addEventListener("click", () =>
      this.getPopularMovieList(this.movieResults.getPage() + 1),
    );
  }

  async getPopularMovieList(page: number = 1) {
    const { page: newPage, results: movieList }: IMovieResult =
      await getPopularMovieResult(page);

    this.movieResults.addMovieList(newPage, movieList); // 도메인 업데이트

    this.renderMovieList(movieList); // 뷰 업데이트
  }

  renderMovieList(movieList: IMovieItem[]) {
    movieList.forEach((movie) => {
      this.sectionElement.querySelector("ul")?.appendChild(MovieItem(movie));
    });
  }
}

export default MovieListController;
