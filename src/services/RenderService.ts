import type { AppElements } from "../../types/dom";
import type { Movie } from "../../types/movie";
import { BASE_URL, IMAGE_URL, SKELETON_MOVIE_COUNT } from "../constants/constant";
import { createImageUrl, formatMovieRate } from "./MovieService";

const createMovieListItemElement = (movie: Movie) => {
  const posterImageUrl = createImageUrl(BASE_URL.POSTER_BASE_URL, movie.thumbnail_path ?? "");

  const listItem = document.createElement("li");
  const item = document.createElement("div");
  const thumbnail = document.createElement("img");
  const itemDesc = document.createElement("div");
  const rate = document.createElement("p");
  const star = document.createElement("img");
  const rateValue = document.createElement("span");
  const title = document.createElement("strong");

  item.className = "item";
  item.dataset.movieId = String(movie.id);
  item.tabIndex = 0;
  item.setAttribute("role", "button");
  item.setAttribute("aria-label", `${movie.title} 상세 보기`);

  thumbnail.className = "thumbnail";
  thumbnail.src = posterImageUrl;
  thumbnail.alt = "영화 포스터 썸네일 이미지";

  itemDesc.className = "item-desc";

  rate.className = "rate";

  star.src = IMAGE_URL.STAR_IMAGE_URL;
  star.className = "star";
  star.setAttribute("aria-hidden", "true");

  rateValue.textContent = formatMovieRate(movie.rate);
  title.textContent = movie.title;

  rate.append(star, rateValue);
  itemDesc.append(rate, title);
  item.append(thumbnail, itemDesc);
  listItem.append(item);

  return listItem;
};

const createSkeletonListItemElement = () => {
  const listItem = document.createElement("li");
  const item = document.createElement("div");
  const thumbnail = document.createElement("div");
  const itemDesc = document.createElement("div");
  const rate = document.createElement("p");
  const rateIcon = document.createElement("span");
  const rateValue = document.createElement("span");
  const title = document.createElement("div");

  item.className = "item";
  item.setAttribute("aria-hidden", "true");

  thumbnail.className = "thumbnail thumbnail-skeleton skeleton";

  itemDesc.className = "item-desc";

  rate.className = "rate rate-skeleton";

  rateIcon.className = "rate-icon-skeleton skeleton";
  rateValue.className = "rate-value-skeleton skeleton";
  title.className = "title-skeleton skeleton";

  rate.append(rateIcon, rateValue);
  itemDesc.append(rate, title);
  item.append(thumbnail, itemDesc);
  listItem.append(item);

  return listItem;
};

export const renderMovies = (movies: Movie[], movieListElement: HTMLUListElement) => {
  movieListElement.replaceChildren(...movies.map(createMovieListItemElement));
};

export const renderHeroMovie = (movie: Movie, elements: AppElements) => {
  const posterImageUrl = createImageUrl(BASE_URL.HERO_BASE_URL, movie.hero_path ?? "");

  elements.heroBackdrop.style.backgroundImage = posterImageUrl ? `url("${posterImageUrl}")` : "";
  elements.heroRate.hidden = false;
  elements.heroRateValue.textContent = formatMovieRate(movie.rate);
  elements.heroTitle.textContent = movie.title;
};

export const makeSkeleton = (skeletonCardElement: HTMLUListElement) => {
  skeletonCardElement.replaceChildren(...Array.from({ length: SKELETON_MOVIE_COUNT }, createSkeletonListItemElement));
};
