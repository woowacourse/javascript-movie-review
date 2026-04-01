import { Movie, Movies } from "./service/dto";

const createMovieNode = (movie: Movie): DocumentFragment | null => {
  const movieTemplate =
    document.querySelector<HTMLTemplateElement>(`#movie-template`);
  if (!movieTemplate) return null;

  const movieFragment = movieTemplate.content.cloneNode(
    true,
  ) as DocumentFragment;

  const movieItem = movieFragment.querySelector("li");
  if (!movieItem) return null;
  movieItem.dataset.movieId = String(movie.id);

  const thumbnail = movieFragment.querySelector<HTMLImageElement>(".thumbnail");
  if (!thumbnail) return null;
  thumbnail.src =
    `https://media.themoviedb.org/t/p/w220_and_h330_face` + movie.poster_path;
  thumbnail.alt = movie.title;

  const itemDesc = movieFragment.querySelector(".item-desc");

  const rate = itemDesc?.querySelector("span");
  if (!rate) return null;
  rate.textContent = movie.vote_average.toString();

  const title = itemDesc?.querySelector("strong");
  if (!title) return null;
  title.textContent = movie.title;

  return movieFragment;
};

const hideMoreButton = () => {
  const moreButton = document.querySelector<HTMLDivElement>("#more-button");
  if (!moreButton) return null;

  moreButton.style.display = "none";
};

const showMoreButton = () => {
  const moreButton = document.querySelector<HTMLDivElement>("#more-button");
  if (!moreButton) return null;

  moreButton.style.display = "block";
};

export const renderTopRatedMovie = (movies: Movies) => {
  const topRatedMovie = movies.results[0];
  const topRatedContainer = document.querySelector(".top-rated-container");
  if (!topRatedContainer) return null;

  const overlay = document.querySelector<HTMLDivElement>(".overlay");
  if (!overlay) return null;
  overlay.style.background = `url(${`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces` + topRatedMovie.backdrop_path}) center center no-repeat`;

  const rateValue = topRatedContainer.querySelector(".rate-value");
  if (!rateValue) return null;
  rateValue.textContent = topRatedMovie.vote_average.toString();

  const title = topRatedContainer.querySelector(".title");
  if (!title) return null;
  title.textContent = topRatedMovie.title;
};

export const renderMovieList = (movies: Movies): void => {
  const movieList = document.querySelector("#movie-list");

  movies.results.forEach((movie: Movie) => {
    const movieNode = createMovieNode(movie);
    if (movieNode) {
      movieList?.appendChild(movieNode);
    }
  });

  if (movies.page === movies.total_pages) {
    hideMoreButton();
  } else {
    showMoreButton();
  }
};

export const renderNoResult = () => {
  const thumbnailList = document.querySelector(".thumbnail-list");
  if (!thumbnailList) return;
  const empty = '<p id="no-result">검색 결과가 없습니다.</p>';
  thumbnailList.innerHTML = empty;

  hideMoreButton();
};

export const renderSkeleton = () => {
  const skeleton = document.querySelector<HTMLDivElement>("#skeleton");
  if (!skeleton) return;

  const skeletonTemplate =
    document.querySelector<HTMLTemplateElement>("#movie-template");
  if (!skeletonTemplate) return null;

  for (let i = 0; i < 20; i++) {
    const skeletonCloneNode = skeletonTemplate.content.cloneNode(
      true,
    ) as DocumentFragment;
    if (!skeletonCloneNode) return null;

    skeleton.appendChild(skeletonCloneNode);
  }
};

export const removeTopRatedMovie = () => {
  const topRatedMovie =
    document.querySelector<HTMLDivElement>(".top-rated-movie");
  if (!topRatedMovie) return null;
  topRatedMovie.style.display = "none";

  const background = document.querySelector<HTMLDivElement>(
    ".background-container",
  );
  if (!background) return null;
  background.style.backgroundColor = "transparent";
  background.style.height = "auto";

  const overlay = document.querySelector<HTMLDivElement>(".overlay");
  if (!overlay) return null;
  overlay.style.background = "";
  overlay.style.display = "none";
};

export const removeMovieList = () => {
  const movieList = document.querySelector<HTMLDivElement>("#movie-list");
  if (!movieList) return;

  movieList.replaceChildren();
};

export const removeSkeleton = () => {
  const skeleton = document.querySelector<HTMLDivElement>("#skeleton");
  if (!skeleton) return;

  skeleton.classList.add("animation");

  setTimeout(() => {
    skeleton.classList.remove("animation");
    skeleton.replaceChildren();
  }, 3000);
};
