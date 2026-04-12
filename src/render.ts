import type { Movie } from "./api.ts";
import Component from "./component.ts";
import { observeHeaderScroll } from "./observer.ts";
import {
  IMAGE_PATH,
  RATING_STRING,
  RATING_BLANK_IMAGE,
  RATING_FILL_IMAGE,
} from "./constants/movie.ts";

export const IndexRenderer = {
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
    this.renderSectionHeading();
  },

  renderLoadMoreMovies(movies: Movie[]) {
    const movieList = document.querySelector(".thumbnail-list");
    if (movieList) {
      Renderer.clearSkeleton(movieList);
      Renderer.renderMovies(movieList, movies);
    }
  },

  renderSectionHeading() {
    const heading = document.querySelector("section > h2");
    if (heading instanceof HTMLElement) {
      heading.innerHTML = `지금 인기 있는 영화`;
    }
  },
};

export const SearchRenderer = {
  renderSearchResult(movies: Movie[], query: string) {
    const movieList = document.querySelector(".thumbnail-list");
    Renderer.clearBanner();
    Renderer.clearMovies();
    Renderer.clearEmptyResult();
    this.renderSearchSectionHeading(query);
    if (movies.length === 0) Renderer.renderEmptyResult();
    else if (movieList) Renderer.renderMovies(movieList, movies);
  },

  renderLoadMoreSearchMovies(movies: Movie[]) {
    const movieList = document.querySelector(".thumbnail-list");
    if (movieList) {
      Renderer.clearSkeleton(movieList);
      Renderer.renderMovies(movieList, movies);
    }
  },

  renderSearchSectionHeading(title: string) {
    const heading = document.querySelector("section > h2");
    if (heading instanceof HTMLElement) {
      heading.innerHTML = `"${title}"검색 결과`;
      heading.style.marginTop = "12rem";
    }
  },
};

export const MovieDetailRenderer = {
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
    const myRating = document.querySelectorAll("#my-rating button");
    const myRatingToString = document.querySelector("#my-rating-to-string");
    const myRatingRatio = document.querySelector("#my-rating-ratio");
    myRating.forEach((button) => {
      const backgroundImage = button.querySelector<HTMLImageElement>("img");
      if (!backgroundImage) return;
      if (rating >= Number((button as HTMLElement).dataset.rating)) {
        backgroundImage.src = RATING_FILL_IMAGE;
      } else {
        backgroundImage.src = RATING_BLANK_IMAGE;
      }
    });
    if (myRatingToString)
      myRatingToString.innerHTML = RATING_STRING[rating] ?? "";
    if (myRatingRatio instanceof HTMLElement)
      myRatingRatio.innerHTML = `(${rating}/${Object.keys(RATING_STRING).slice(-1)})`;
  },

  clearMovieDetail() {
    const modal = document.querySelector("#modalBackground");
    modal?.remove();
    document.body.classList.remove("modal-open");
  },
};

export const Renderer = {
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
    parent.querySelectorAll(".skeleton").forEach((el) => el.remove());
  },

  renderError(err: unknown) {
    const message = err instanceof Error ? err.message : "에러가 발생했습니다.";
    const content = document.querySelector(".thumbnail-list");
    if (content) content.innerHTML = Component.error(message);
  },
};
