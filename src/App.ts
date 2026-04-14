import FilledStarIcon from "./assets/star_filled.png";
import LogoView from "./View/LogoView";

import MovieListView from "./View/MovieListView";
import TopRatedView from "./View/TopRatedView";
import MovieDetailView from "./View/MovieDetailView";
import RatingView from "./View/RatingView";
import MovieListController from "./Controller/MovieListController";
import SearchView from "./View/SearchView";
import TopRatedController from "./Controller/TopRatedController";
import MovieDetailModalController from "./Controller/MovieDetailModalController";
import InfiniteScrollObserver from "./Controller/InfiniteScrollObserver";

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
      movieDetail: new MovieDetailModalController(
        this.#views.movieDetail,
        this.#views.rating,
      ),
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

    this.#bindInfiniteScroll();
  }

  #bindAllEvents() {
    this.#views.logo.bindEvent(() => location.reload());
    this.#views.topRated.bindEvent(async (movieId: number) => {
      await this.#controller.movieDetail.showMovieInformation(movieId);
    });

    this.#views.movieList.bindEvent(async (movieId: number) => {
      await this.#controller.movieDetail.showMovieInformation(movieId);
    });
    this.#views.movieDetail.bindCloseEvent();
    this.#views.rating.bindEvent((ratingValue: number) => {
      this.#controller.movieDetail.setRatingValue(ratingValue);
    });

    this.#views.search.bindEvent(async () => {
      this.#controller.topRated.hideBanner();
      const query = this.#views.search.getInputValue();
      await this.#controller.movieList.search(query);
    });
  }

  #bindInfiniteScroll() {
    const footer = document.querySelector("footer");
    if (!footer) return;

    new InfiniteScrollObserver(
      footer,
      this.#controller.movieList.loadNextPage.bind(this.#controller.movieList),
    );
  }
}

export default App;
