import image from "../templates/images/star_filled.png";
import { fetchPopularMovies, fetchSearchedMovies } from "./api/fetchMovies";
import { extractThumbnailInfo } from "./thumnailManager";
import LogoView from "./View/LogoView";
import MoreMovieView from "./View/MoreMovieView";
import MovieListView from "./View/MovieListView";
import SearchView from "./View/SearchView";
import TopRatedView from "./View/TopRatedView";

class App {
  #views;
  #state;

  constructor() {
    this.#views = {
      logo: new LogoView(),
      topRated: new TopRatedView(),
      search: new SearchView(),
      movieList: new MovieListView(),
      moreMovie: new MoreMovieView(),
    };

    this.#state = {
      popularMoviePage: 1,
      searchMoviePage: 1,
    };
  }

  async init() {
    this.#bindAllEvents();

    addEventListener("load", () => {
      //   const app = document.querySelector("#app");
      const buttonImage = document.createElement("img");
      buttonImage.src = image;

      //   if (app) {
      //     app.appendChild(buttonImage);
      //   }
    });

    await this.#renderPopularMovie();
  }

  #bindAllEvents() {
    this.#views.moreMovie.bindEvent(this.#moreMovieEventHandler);
    this.#views.search.bindEvent(this.#searchEventHandler);
    this.#views.logo.bindEvent();
  }

  async #renderPopularMovie() {
    try {
      this.#views.movieList.addSkeletons();
      const { movies: popularMovies, totalPages: popularTotalPages } =
        await fetchPopularMovies(this.#state.popularMoviePage);
      this.#views.movieList.addMovies(extractThumbnailInfo(popularMovies));
      this.#views.movieList.removeAllSkeletons();

      if (this.#state.popularMoviePage === popularTotalPages) {
        this.#views.moreMovie.hide();
      }

      this.#views.topRated.render(extractThumbnailInfo(popularMovies)[0]);
    } catch (error) {
      alert(error);
    }
  }

  #moreMovieEventHandler = async () => {
    this.#views.moreMovie.disable();

    const searchValue = this.#views.search.getInputValue();

    const requestMovies =
      searchValue!.trim().length === 0
        ? () => fetchPopularMovies(++this.#state.popularMoviePage)
        : () =>
            fetchSearchedMovies(++this.#state.searchMoviePage, searchValue!);
    this.#views.movieList.addSkeletons();
    const { movies, nowPage, totalPages } = await requestMovies();
    this.#views.movieList.addMovies(extractThumbnailInfo(movies));
    this.#views.movieList.removeAllSkeletons();

    if (nowPage === totalPages) {
      this.#views.moreMovie.hide();
    }

    this.#views.moreMovie.able();
  };

  #searchEventHandler = async () => {
    this.#views.topRated.hide();
    this.#views.movieList.remove(); // 새로 검색이 된 것이므로 기존 결과 초기화
    this.#views.movieList.hideNotFound(); // 올바른 검색결과에도 notFound가 표시되는 것 방지

    // 1. 타이틀 변경
    const searchValue = this.#views.search.getInputValue();
    this.#views.movieList.renderTitle(`"${searchValue}"검색 결과`);

    // 2. 영화 검색 데이터 반영
    this.#views.movieList.addSkeletons();
    const { movies } = await fetchSearchedMovies(1, searchValue);
    this.#views.movieList.addMovies(extractThumbnailInfo(movies!));
    this.#views.movieList.removeAllSkeletons();

    // 3. 검색 결과가 없으면 notFound 표시
    if (movies!.length === 0) {
      this.#views.movieList.showNotFound();
      this.#views.moreMovie.hide();
    }
  };
}

export default App;
