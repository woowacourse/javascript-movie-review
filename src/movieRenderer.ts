import type { Movie } from "../types/Movie.ts";
import {
  createMovieItemHTML,
  createBannerHTML,
  createNoResultHTML,
} from "./createHtml.ts";
import DOM from "./dom.ts";

const bannerBaseURL = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

export const renderMovies = (movies: Movie[]) => {
  movies.forEach((movie: Movie) => {
    const li = createMovieItemHTML(movie);
    attachSkeletonEvents(li);
    DOM.thumbnailList?.appendChild(li);
  });
};

const attachSkeletonEvents = (li: HTMLLIElement) => {
  const img = li.querySelector<HTMLImageElement>(".thumbnail")!;
  const removeSkeleton = () => {
    li.querySelector(".item")?.classList.remove("skeleton");
    li.querySelector(".skeleton-poster")?.remove();
    li.querySelector(".skeleton-rate")?.remove();
    li.querySelector(".skeleton-title")?.remove();
  };

  img.addEventListener("load", removeSkeleton, { once: true });
  img.addEventListener(
    "error",
    () => {
      img.src = "./images/no_image.png";
      removeSkeleton();
    },
    { once: true },
  );
};

export const renderBanner = (movie: Movie) => {
  if (DOM.backgroundContainer) {
    DOM.backgroundContainer.style.backgroundImage =
      `url("${bannerBaseURL + movie.backdrop_path}")`;
  }

  DOM.banner?.appendChild(createBannerHTML(movie));
};

export const renderSearchedMovies = (movies: Movie[]) => {
  if (DOM.thumbnailList && movies.length === 0) {
    DOM.thumbnailList.appendChild(createNoResultHTML());
  }

  movies.forEach((movie: Movie) => {
    const li = createMovieItemHTML(movie);
    attachSkeletonEvents(li);
    DOM.thumbnailList?.appendChild(li);
  });
};
