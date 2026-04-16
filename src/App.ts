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
    addEventListener("load", () => {
      const buttonImage = document.createElement("img");
      buttonImage.src = FilledStarIcon;
    });

    this.#bindAllEvents();
    this.#views.movieList.removeTopMargin();

    await this.#controller.movieList.loadInitialPopular();
    await this.#controller.topRated.loadBanner();

    this.#bindInfiniteScroll();
  }

  #bindAllEvents() {
    this.#views.logo.bindLogoClick(() => location.reload());
    this.#views.topRated.bindDetailButtonClick(async (movieId: number) => {
      await this.#controller.movieDetail.showMovieInformation(movieId);
    });

    this.#views.movieList.bindMovieItemClick(async (movieId: number) => {
      await this.#controller.movieDetail.showMovieInformation(movieId);
    });
    this.#views.movieDetail.bindModalCloseActions();
    this.#views.rating.bindRatingStarClick((ratingValue: number) => {
      this.#controller.movieDetail.setRatingValue(ratingValue);
    });

    this.#views.search.bindSearchSubmit(async () => {
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
