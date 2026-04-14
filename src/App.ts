import FilledStarIcon from "./assets/star_filled.png";
import LogoView from "./View/LogoView";

import MovieListView from "./View/MovieListView";
import TopRatedView from "./View/TopRatedView";
import MovieDetailView from "./View/MovieDetailView";
import { fetchMovieDetail } from "./api/fetchMovieDetail";
import RatingView from "./View/RatingView";
import MovieListController from "./Controller/MovieListController";
import SearchView from "./View/SearchView";
import TopRatedController from "./Controller/TopRatedController";

class App {
  #views;
  #controller;

  constructor() {
    this.#views = {
      logo: new LogoView(),
      topRated: new TopRatedView(),
      movieList: new MovieListView(),
      movieDetail: new MovieDetailView(),
      rating: new RatingView(),
      search: new SearchView(),
    };

    this.#controller = {
      movieList: new MovieListController(this.#views.movieList),
      topRated: new TopRatedController(this.#views.topRated),
    };
  }

  async init() {
    this.#bindAllEvents();
    this.#views.movieList.removeTopMargin();

    addEventListener("load", () => {
      const buttonImage = document.createElement("img");
      buttonImage.src = FilledStarIcon;
    });

    await this.#controller.movieList.loadInitialPopular();
    await this.#controller.topRated.loadBanner();
  }

  #bindAllEvents() {
    this.#bindWindowEvent();
    this.#views.logo.bindEvent(this.#logoEventHandler);
    this.#views.movieList.bindEvent(this.#movieDetailEventHandler);
    this.#views.movieDetail.bindCloseEvent();
    this.#views.topRated.bindEvent(this.#movieDetailEventHandler);
    this.#views.rating.bindEvent(this.#ratingEventHandler);

    this.#views.search.bindEvent(async () => {
      const query = this.#views.search.getInputValue();
      await this.#controller.movieList.search(query);
    });
  }

  #logoEventHandler = () => {
    location.reload();
  };

  #bindWindowEvent = () => {
    window.addEventListener("scroll", async () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        await this.#controller.movieList.loadNextPage();
      }
    });
  };

  #movieDetailEventHandler = async (movieId: number) => {
    const movieDetail = { ...(await fetchMovieDetail(movieId)) };

    this.#views.movieDetail.show();
    const savedRatingValue = Number(localStorage.getItem(`rating-${movieId}`));
    this.#views.rating.renderByRatingValue(savedRatingValue);

    this.#views.movieDetail.renderData(movieDetail);
  };

  #ratingEventHandler = (ratingValue: string) => {
    this.#views.rating.setRating(ratingValue);
    const movieId = this.#views.movieDetail.getMovieId();
    localStorage.setItem(`rating-${movieId}`, ratingValue);
    this.#views.rating.renderByRatingValue(Number(ratingValue));
  };
}

export default App;
