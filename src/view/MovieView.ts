import type { Result, TMDBDetails } from "../../types/tmdb.types";
import {
  ratingMessages,
  ratingNumbers,
  defaultRating,
} from "../setting/settings";
import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import MovieItem from "../components/moveItem/movieItem";
import { bindHeroEvents } from "../binders/event-binders";

export function showElement(element: Element | null) {
  element?.classList.remove("hide");
}

export function hideElement(element: Element | null) {
  element?.classList.add("hide");
}

export function hideImgSkeleton(event: Event) {
  const img = event.target as HTMLElement;
  if (!img) return;

  showElement(img);

  const skeleton = img.parentElement?.parentElement?.querySelector(
    ".skeleton-thumbnail"
  );

  skeleton?.remove();
}

export function renderMovieItems(results: Result[], reset?: boolean) {
  const $list = document.getElementById("thumbnail-list");

  if (reset && $list) {
    $list.innerHTML = "";
  }

  for (const result of results) {
    const { id, title, poster_path, vote_average } = result;
    const movieItem = MovieItem({
      id,
      title,
      src: poster_path,
      rate: vote_average,
      onload: hideImgSkeleton,
    });
    $list?.appendChild(movieItem);
  }
}

export function renderHeaderAndHero() {
  const $wrap = document.getElementById("wrap");
  if ($wrap) {
    $wrap.prepend(Header());
    $wrap.prepend(Hero());
  }
}

// Hero 렌더링 관련 함수들
function renderHeroImage(
  heroImg: HTMLImageElement,
  poster_path: string | null
) {
  const url = getHeroImageUrl(poster_path);
  heroImg.src = url;
}

function renderHeroContent(
  heroAverage: HTMLElement | null,
  heroTitle: HTMLElement | null,
  topRatedContainer: HTMLElement | null,
  vote_average: number,
  title: string
) {
  if (heroAverage) heroAverage.innerText = Number(vote_average).toFixed(1);
  if (heroTitle) heroTitle.innerText = title;
  showElement(topRatedContainer);
}

export function updateHero({ poster_path, title, vote_average }: Result) {
  const heroImg = document.getElementById("hero-img") as HTMLImageElement;
  const heroTitle = document.getElementById("hero-title");
  const heroAverage = document.getElementById("hero-rate");
  const topRatedContainer = document.getElementById("top-rated-container");

  if (heroImg) {
    renderHeroImage(heroImg, poster_path);
  }

  renderHeroContent(
    heroAverage,
    heroTitle,
    topRatedContainer,
    vote_average,
    title
  );
  bindHeroEvents();
}

// Details 렌더링 관련 함수들
function renderDetailsContent(
  detailsTitle: HTMLElement,
  detailsRate: HTMLElement,
  detailsCategory: HTMLElement,
  detailsDescription: HTMLElement,
  title: string,
  vote_average: number,
  categoryNames: string,
  overview: string
) {
  detailsTitle.innerText = title;
  detailsRate.innerText = Number(vote_average).toFixed(1);
  detailsCategory.innerText = categoryNames;
  detailsDescription.innerText = overview;
}

function renderDetailsImage(
  detailsImage: HTMLImageElement,
  detailsSkeleton: HTMLElement | null,
  imgUrl: string
) {
  hideElement(detailsImage);
  if (detailsSkeleton) {
    showElement(detailsSkeleton);
  }

  detailsImage.src = imgUrl;
  detailsImage.onload = () => {
    if (detailsSkeleton) {
      hideElement(detailsSkeleton);
    }
    showElement(detailsImage);
  };
}

function renderRatingDisplay(
  id: number,
  starRatingDetails: HTMLElement,
  starRatingNumbers: HTMLElement
) {
  const savedRating = localStorage.getItem(String(id));
  if (savedRating) {
    const input = document.querySelector(
      `input[name="star-rating"][value="${savedRating}"]`
    ) as HTMLInputElement;
    if (input) input.checked = true;
    starRatingDetails.innerText =
      ratingMessages[savedRating as keyof typeof ratingMessages];
    starRatingNumbers.innerText =
      ratingNumbers[savedRating as keyof typeof ratingNumbers];
  } else {
    starRatingDetails.innerText = ratingMessages[defaultRating];
    starRatingNumbers.innerText = ratingNumbers[defaultRating];
    (document.getElementById("star3") as HTMLInputElement).checked = true;
  }
}

export function updateDetails({
  poster_path,
  release_date,
  overview,
  title,
  vote_average,
  genres,
  id,
}: TMDBDetails) {
  const detailsImage = document.getElementById(
    "details-image"
  ) as HTMLImageElement;
  const detailsTitle = document.getElementById("details-title") as HTMLElement;
  const detailsCategory = document.getElementById(
    "details-category"
  ) as HTMLElement;
  const detailsRate = document.getElementById("details-rate") as HTMLElement;
  const detailsDescription = document.getElementById(
    "details-description"
  ) as HTMLElement;
  const starRatingDetails = document.getElementById(
    "star-rating-details"
  ) as HTMLElement;
  const starRatingNumbers = document.getElementById(
    "star-rating-numbers"
  ) as HTMLElement;
  const detailsSkeleton = document.getElementById("details-skeleton");

  const categoryNames = getCategoryNames(genres, release_date);
  const imgUrl = getDetailsImageUrl(poster_path);

  renderDetailsContent(
    detailsTitle,
    detailsRate,
    detailsCategory,
    detailsDescription,
    title,
    vote_average,
    categoryNames,
    overview
  );

  if (detailsImage && detailsSkeleton) {
    renderDetailsImage(detailsImage, detailsSkeleton, imgUrl);
  }

  renderRatingDisplay(id, starRatingDetails, starRatingNumbers);
}

// 유틸리티 함수들
function getHeroImageUrl(poster_path: string | null): string {
  if (!poster_path) return "images/fallback.png";
  return `https://image.tmdb.org/t/p/original${poster_path}`;
}

function getDetailsImageUrl(poster_path: string | null): string {
  if (!poster_path) return "./images/fallback_no_movies.png";
  return `https://image.tmdb.org/t/p/original${poster_path}`;
}

function getCategoryNames(
  genres: { name: string }[] | undefined,
  release_date: Date | string
): string {
  if (!genres) return "";
  return `${new Date(release_date).getFullYear()} · ${genres
    .map((genre) => genre.name)
    .join(", ")} `;
}
