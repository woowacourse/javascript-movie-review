import FilledStarIcon from "./assets/star_filled.png";
import { fetchPopularMovies, fetchSearchedMovies } from "./api/fetchMovies";
import { ERROR_MESSAGE } from "./constants/errorMessage";
import { extractThumbnailInfo } from "./thumnailManager";
import LogoView from "./View/LogoView";
import MoreMovieView from "./View/MoreMovieView";
import MovieListView from "./View/MovieListView";
import SearchView from "./View/SearchView";
import TopRatedView from "./View/TopRatedView";
import MovieDetailView from "./View/MovieDetailView";
import { fetchMovieDetail } from "./api/fetchMovieDetail";

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
      movieDetail: new MovieDetailView(),
    };

    this.#state = {
      popularMoviePage: 1,
      searchMoviePage: 1,
      searchString: "",
    };
  }

  async init() {
    this.#bindAllEvents();

    addEventListener("load", () => {
      //   const app = document.querySelector("#app");
      const buttonImage = document.createElement("img");
      buttonImage.src = FilledStarIcon;

      //   if (app) {
      //     app.appendChild(buttonImage);
      //   }
    });

    await this.#renderPopularMovieAtFirst();
  }

  #bindAllEvents() {
    this.#views.moreMovie.bindEvent(this.#moreMovieEventHandler);
    this.#views.search.bindEvent(this.#searchEventHandler);
    this.#views.logo.bindEvent(this.#logoEventHandler);
    this.#views.movieList.bindEvent(this.#movieDetailEventHandler);
    this.#views.movieDetail.bindCloseEvent();
  }

  async #renderPopularMovieAtFirst() {
    try {
      this.#views.movieList.addSkeletons();
      const { movies: popularMovies, totalPages: popularTotalPages } =
        await fetchPopularMovies(this.#state.popularMoviePage);
      this.#views.movieList.addMovies(extractThumbnailInfo(popularMovies));

      if (this.#state.popularMoviePage === popularTotalPages) {
        this.#views.moreMovie.hide();
      }

      this.#views.topRated.render(extractThumbnailInfo(popularMovies)[0]);
    } catch (error) {
      alert(ERROR_MESSAGE.MOVIE.FAIELD_GET_POPULAR);
    } finally {
      this.#views.movieList.removeAllSkeletons();
    }
  }

  #logoEventHandler = () => {
    location.reload();
  };

  #moreMovieEventHandler = async () => {
    this.#views.moreMovie.disable();

    const searchValue = this.#state.searchString;

    const requestMovies =
      searchValue.trim().length === 0
        ? () => fetchPopularMovies(++this.#state.popularMoviePage)
        : () => fetchSearchedMovies(++this.#state.searchMoviePage, searchValue);

    try {
      this.#views.movieList.addSkeletons();
      const { movies, nowPage, totalPages } = await requestMovies();

      if (nowPage === totalPages) {
        this.#views.moreMovie.hide();
      }

      this.#views.movieList.addMovies(extractThumbnailInfo(movies));
    } catch (error) {
      alert(ERROR_MESSAGE.MOVIE.FAILED_GET_MORE);
    } finally {
      this.#views.movieList.removeAllSkeletons();
      this.#views.moreMovie.able();
    }
  };

  #searchEventHandler = async () => {
    const searchValue = this.#views.search.getInputValue();
    if (searchValue === this.#state.searchString) {
      return;
    }

    this.#views.topRated.hide();
    this.#views.movieList.hideNotFound(); // 올바른 검색결과에도 notFound가 표시되는 것 방지
    this.#state.searchMoviePage = 1;

    window.scrollTo({ top: 0, behavior: "instant" });
    // 1. 타이틀 변경
    this.#views.movieList.renderTitle(`"${searchValue}"검색 결과`);

    // 2. 영화 검색 데이터 반영
    try {
      this.#views.movieList.remove(); // remove 위치 점검 필요
      this.#views.movieList.addSkeletons();
      const { movies, nowPage, totalPages } = await fetchSearchedMovies(
        this.#state.searchMoviePage,
        searchValue,
      );

      this.#views.moreMovie.show();
      this.#views.movieList.addMovies(extractThumbnailInfo(movies));

      if (nowPage === totalPages) {
        this.#views.moreMovie.hide();
      }

      // 3. 검색 결과가 없으면 notFound 표시
      if (movies.length === 0) {
        this.#views.movieList.showNotFound();
        this.#views.moreMovie.hide();
      }

      this.#state.searchString = searchValue;
    } catch (error) {
      alert(ERROR_MESSAGE.MOVIE.FAILED_SEARCH);
    } finally {
      this.#views.movieList.removeAllSkeletons();
    }
  };

  #movieDetailEventHandler = async (movieId: number) => {
    const movieDetail = { ...(await fetchMovieDetail(movieId)) };

    this.#views.movieDetail.show();

    this.#views.movieDetail.renderData(movieDetail);
  };
}

export default App;
