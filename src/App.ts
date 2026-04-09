import FilledStarIcon from "./assets/star_filled.png";
import { fetchPopularMovies, fetchSearchedMovies } from "./api/fetchMovies";
import { ERROR_MESSAGE } from "./constants/errorMessage";
import { extractThumbnailInfo } from "./thumnailManager";
import LogoView from "./View/LogoView";

import MovieListView from "./View/MovieListView";
import SearchView from "./View/SearchView";
import TopRatedView from "./View/TopRatedView";
import MovieDetailView from "./View/MovieDetailView";
import { fetchMovieDetail } from "./api/fetchMovieDetail";
import RatingView from "./View/RatingView";

class App {
  #views;
  #state;

  constructor() {
    this.#views = {
      logo: new LogoView(),
      topRated: new TopRatedView(),
      search: new SearchView(),
      movieList: new MovieListView(),
      movieDetail: new MovieDetailView(),
      rating: new RatingView(),
    };

    this.#state = {
      popularMoviePage: 1,
      searchMoviePage: 1,
      totalSearchMoviePage: 1,
      totalPopularMoviePage: 1,
      searchString: "",
    };
  }

  async init() {
    this.#bindAllEvents();

    addEventListener("load", () => {
      const buttonImage = document.createElement("img");
      buttonImage.src = FilledStarIcon;
    });

    await this.#renderPopularMovieAtFirst();
  }

  #bindAllEvents() {
    this.#bindWindowEvent();
    this.#views.search.bindEvent(this.#searchEventHandler);
    this.#views.logo.bindEvent(this.#logoEventHandler);
    this.#views.movieList.bindEvent(this.#movieDetailEventHandler);
    this.#views.movieDetail.bindCloseEvent();
    this.#views.topRated.bindEvent(this.#movieDetailEventHandler);
    this.#views.rating.bindEvent(this.#ratingEventHandler);
  }

  async #renderPopularMovieAtFirst() {
    try {
      this.#views.movieList.addSkeletons();
      const {
        movies: popularMovies,
        nowPage,
        totalPages: popularTotalPages,
      } = await fetchPopularMovies(this.#state.popularMoviePage);
      this.#state.popularMoviePage = nowPage;
      this.#state.totalPopularMoviePage = popularTotalPages;

      this.#views.movieList.addMovies(extractThumbnailInfo(popularMovies));

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

  #bindWindowEvent = () => {
    window.addEventListener("scroll", async () => {
      if (
        this.#state.searchString.length !== 0 &&
        this.#state.searchMoviePage === this.#state.totalSearchMoviePage
      ) {
        return;
      }
      if (
        this.#state.searchString.length === 0 &&
        this.#state.popularMoviePage === this.#state.totalPopularMoviePage
      ) {
        return;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        const searchValue = this.#state.searchString;

        const requestMovies =
          searchValue.trim().length === 0
            ? () => fetchPopularMovies(++this.#state.popularMoviePage)
            : () =>
                fetchSearchedMovies(++this.#state.searchMoviePage, searchValue);

        setTimeout(async () => {
          try {
            this.#views.movieList.addSkeletons();
            const { movies, nowPage, totalPages } = await requestMovies();
            this.#state.totalSearchMoviePage = totalPages;
            this.#state.searchMoviePage = nowPage;

            this.#views.movieList.addMovies(extractThumbnailInfo(movies));
          } catch (error) {
            alert(ERROR_MESSAGE.MOVIE.FAILED_GET_MORE);
          } finally {
            this.#views.movieList.removeAllSkeletons();
          }
        }, 200);
      }
    });
  };

  #searchEventHandler = async () => {
    const searchValue = this.#views.search.getInputValue();
    if (searchValue === this.#state.searchString) {
      return;
    }

    this.#state.searchString = searchValue;
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

      this.#state.totalSearchMoviePage = totalPages;
      this.#state.searchMoviePage = nowPage;

      this.#views.movieList.addMovies(extractThumbnailInfo(movies));

      // 3. 검색 결과가 없으면 notFound 표시
      if (movies.length === 0) {
        this.#views.movieList.showNotFound();
      }
    } catch (error) {
      alert(ERROR_MESSAGE.MOVIE.FAILED_SEARCH);
    } finally {
      this.#views.movieList.removeAllSkeletons();
    }
  };

  #movieDetailEventHandler = async (movieId: number) => {
    const movieDetail = { ...(await fetchMovieDetail(movieId)) };

    this.#views.movieDetail.show();
    const savedRatingValue = Number(localStorage.getItem(`rating-${movieId}`));
    this.#views.rating.renderByRatingValue(savedRatingValue); // 누를

    this.#views.movieDetail.renderData(movieDetail);
  };

  #ratingEventHandler = (ratingValue: string) => {
    // 일단 눌린 애가 몇 번째 별인지 확인해야함
    this.#views.rating.setRating(ratingValue);
    // 자기보다 아래에 있는 별들을 다 렌더링 함
    const movieId = this.#views.movieDetail.getMovieId();
    localStorage.setItem(`rating-${movieId}`, ratingValue);
    this.#views.rating.renderByRatingValue(Number(ratingValue));
    // localStorage에 데이터를 저장함
  };
}

export default App;
