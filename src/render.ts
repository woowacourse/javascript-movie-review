import type { Movie } from "./api.ts";
import Component from "./component.ts";
import { observeHeaderScroll } from "./observer.ts";
import { IMAGE_PATH } from "./constants/movie.ts";

export const MovieRenderer = {
  renderInitialMovies(movies: Movie[]) {
    const movieList = document.querySelector(".thumbnail-list");
    const banner = document.querySelector(".banner-container");
    if (banner) {
      Renderer.renderBanner(banner, movies[0]);
      observeHeaderScroll();
    }
    if (movieList) {
      Renderer.clearSkeleton(movieList);
      Renderer.renderMovies(movieList, movies);
    }
    Renderer.renderSectionHeading();
  },

  renderLoadMoreMovies(movies: Movie[]) {
    const movieList = document.querySelector(".thumbnail-list");
    if (movieList) {
      Renderer.clearSkeleton(movieList);
      Renderer.renderMovies(movieList, movies);
    }
  },

  renderSearchResult(movies: Movie[], query: string) {
    Renderer.clearBanner();
    Renderer.clearMovies();
    Renderer.clearEmptyResult();
    Renderer.renderSearchSectionHeading(query);
    if (movies.length === 0) Renderer.renderEmptyResult();
    else Renderer.renderSearchMovies(movies);
  },

  renderLoadMoreSearchMovies(movies: Movie[]) {
    const movieList = document.querySelector(".thumbnail-list");
    if (movieList) {
      Renderer.clearSkeleton(movieList);
      Renderer.renderSearchMovies(movies);
    }
  },

  renderMovieDetail(
    movieData: Movie,
    releaseYear: number,
    genres: string[],
    rating: number,
  ) {
    const { id, title, poster_path, vote_average, overview } = movieData;
    const movieContainer = document.querySelector<HTMLElement>(
      "#movie-detail-container",
    );
    const movieTitle = document.querySelector("#movie-detail-title");
    const moviePoster = document.querySelector("#movie-detail-poster");
    const movieVoteAverage = document.querySelector(
      "#movie-detail-vote-average",
    );
    const movieOverview = document.querySelector("#movie-detail-overview");
    const movieReleaseYear = document.querySelector(
      "#movie-detail-release-year",
    );
    const movieGenres = document.querySelector("#movie-detail-category");
    if (
      !movieTitle ||
      !movieVoteAverage ||
      !movieOverview ||
      !movieReleaseYear ||
      !movieGenres
    )
      return;
    if (movieContainer) movieContainer.dataset.movieId = String(id);
    movieTitle.innerHTML = title;
    if (moviePoster instanceof HTMLImageElement)
      moviePoster.src = `${IMAGE_PATH}/${poster_path}`;
    movieVoteAverage.innerHTML = vote_average.toFixed(1);
    movieOverview.innerHTML = overview;
    movieReleaseYear.innerHTML = String(releaseYear);
    movieGenres.innerHTML = genres.join(", ");
    this.renderMyRating(rating);
  },

  renderMyRating(rating: number) {
    let ratingToString = "";
    const myRating = document.querySelectorAll("#my-rating button");
    const myRatingToString = document.querySelector("#my-rating-to-string");
    const myRatingRatio = document.querySelector("#my-rating-ratio");
    myRating.forEach((button) => {
      const backgroundImage = button.querySelector<HTMLImageElement>("img");
      if (!backgroundImage) return;
      if (rating >= Number((button as HTMLElement).dataset.rating)) {
        backgroundImage.src = "src/images/star_filled.png";
      } else {
        backgroundImage.src = "src/images/star_empty.png";
      }
    });
    switch (rating) {
      case 10:
        ratingToString = "명작이에요";
        break;
      case 8:
        ratingToString = "재미있어요";
        break;
      case 6:
        ratingToString = "보통이에요";
        break;
      case 4:
        ratingToString = "별로에요";
        break;
      case 2:
        ratingToString = "최악이에요";
        break;
    }
    if (myRatingToString) myRatingToString.innerHTML = ratingToString;
    if (myRatingRatio instanceof HTMLElement)
      myRatingRatio.innerHTML = `(${rating}/10)`;
  },

  renderError(err: unknown) {
    const message = err instanceof Error ? err.message : "에러가 발생했습니다.";
    const content = document.querySelector(".thumbnail-list");
    if (content) Renderer.renderError(content, message);
  },
};

export const Renderer = {
  renderSectionHeading() {
    const heading = document.querySelector("section > h2");
    if (heading instanceof HTMLElement) {
      heading.innerHTML = `지금 인기 있는 영화`;
    }
  },

  renderSearchSectionHeading(title: string) {
    const heading = document.querySelector("section > h2");
    if (heading instanceof HTMLElement) {
      heading.innerHTML = `"${title}"검색 결과`;
      heading.style.marginTop = "12rem";
    }
  },

  renderSearchMovies(movies: Movie[]) {
    const movieList = document.querySelector(".thumbnail-list");
    if (movieList) {
      this.renderMovies(movieList, movies);
    }
  },

  clearMovies() {
    const movieList = document.querySelector(".thumbnail-list");
    if (movieList) movieList.innerHTML = "";
  },

  renderBanner(parent: Element, { title, vote_average, poster_path }: Movie) {
    parent.innerHTML = Component.movieBanner({
      title,
      vote_average,
      poster_path,
    });
  },

  clearBanner() {
    const banner = document.querySelector(".banner-container");
    if (banner) banner.innerHTML = "";
  },

  renderEmptyResult() {
    const section = document.querySelector("section");
    const node = document.createElement("div");
    node.innerHTML = Component.emptyResult();
    section?.appendChild(node);
  },

  clearEmptyResult() {
    const emptyResult = document.querySelector(".empty-result");
    emptyResult?.remove();
  },

  renderError(parent: Element, message: string) {
    parent.innerHTML = Component.error(message);
  },

  renderSkeleton(selector: string, length: number) {
    const target = document.querySelector(selector);
    if (target instanceof HTMLElement) {
      target.innerHTML += Array.from({ length: length })
        .map(() => Component.movieSkeleton())
        .join("");
    }
  },

  renderMovies(parent: Element, movies: Movie[]) {
    const movieListComponent = movies
      .map((movie) => Component.movie(movie))
      .join("");
    parent.innerHTML += movieListComponent;
  },

  clearSkeleton(parent: Element) {
    parent.innerHTML = [...parent.children]
      .filter((child) => {
        if (
          child instanceof HTMLElement &&
          child.classList.contains("skeleton")
        ) {
          return false;
        }
        return true;
      })
      .map((child) => child.outerHTML)
      .join("");
  },

  clearMovieDetail() {
    const modal = document.querySelector("#modalBackground");
    modal?.remove();
    document.body.classList.remove("modal-open");
  },
};
