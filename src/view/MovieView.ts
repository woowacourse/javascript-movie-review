import type { Result, TMDBDetails } from "../../types/tmdb.types";
import {
  ratingMessages,
  ratingNumbers,
  defaultRating,
} from "../setting/settings";
import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import MovieItem from "../components/moveItem/movieItem";

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

  // 아.. 타입 정말.. 타입 가드를 너무 빡빡히 주네요.
  // 충분히 가드를 하고 있다고 생각하는데,
  // 타입스크립트는 마음에 안드나 봅니다.

  skeleton?.remove();
}

export async function renderMovieItems(results: Result[], reset?: boolean) {
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
export function updateHero({ poster_path, title, vote_average }: Result) {
  const heroImg = document.getElementById("hero-img");
  const heroTitle = document.getElementById("hero-title");
  const heroAverage = document.getElementById("hero-rate");
  const topRatedContainer = document.getElementById("top-rated-container");
  const heroButton = document.getElementById("hero-details-button");

  let url = `https://image.tmdb.org/t/p/original${poster_path}`;
  if (!poster_path) url = "images/fallback.png";
  if (heroImg) heroImg.src = url;
  const img = document.getElementById("hero-img");
  const heroSkeleton = document.getElementById("hero-skeleton");
  if (img)
    img.addEventListener("load", () => {
      hideElement(heroSkeleton);
      if (heroAverage) heroAverage.innerText = Number(vote_average).toFixed(1);
      if (heroTitle) heroTitle.innerText = title;
      showElement(topRatedContainer);
    });
  const modal = document.getElementById("modal-dialog");
  if (heroButton)
    heroButton.addEventListener("click", () => {
      modal.showModal();
    });
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

  let categoryNames = "";
  if (genres) {
    categoryNames = `${new Date(release_date).getFullYear()} · ${genres
      .map((genre) => genre.name)
      .join(", ")} `;
  }

  let imgUrl = "./images/fallback_no_movies.png";
  if (poster_path) {
    imgUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
  }

  detailsTitle.innerText = title;
  detailsRate.innerText = Number(vote_average).toFixed(1);
  detailsCategory.innerText = categoryNames;
  detailsDescription.innerText = overview;
  detailsImage.src = imgUrl;
}
