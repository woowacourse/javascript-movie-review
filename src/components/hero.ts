import { createDetailButton } from "./detail-button";
import { MovieList } from "../domains/movie";
import starIconSrc from "../../templates/images/star_empty.png";

interface HeroOptions {
  movieList: MovieList;
}

export function createHero({ movieList }: HeroOptions): HTMLElement {
  const bgImage = createBgImage();
  const detailButton = createDetailButton();
  const topRatedContainer = createTopRatedContainer(detailButton);
  const backgroundContainer = createBackgroundContainer(
    bgImage,
    topRatedContainer,
  );

  movieList.subscribe(({ movies, isPending, page }) => {
    if (isPending || movies.length === 0 || page !== 1) return;
    detailButton.dataset.id = String(movies[0].id);
    updateHero(bgImage, topRatedContainer, movies[0]);
  });

  return backgroundContainer;
}

function createBackgroundContainer(
  bgImage: HTMLImageElement,
  topRatedContainer: HTMLElement,
): HTMLElement {
  const container = document.createElement("div");
  container.className = "background-container";

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.setAttribute("aria-hidden", "true");

  container.append(bgImage, overlay, topRatedContainer);
  return container;
}

function updateHero(
  bgImage: HTMLImageElement,
  topRatedContainer: HTMLElement,
  movie: { posterSrc: string; title: string; rating: number },
): void {
  bgImage.src = movie.posterSrc;
  bgImage.alt = `${movie.title}의 포스터`;

  const titleEl = topRatedContainer.querySelector<HTMLElement>(".title");
  const rateEl = topRatedContainer.querySelector<HTMLElement>(".rate-value");

  if (titleEl) titleEl.textContent = movie.title;
  if (rateEl) rateEl.textContent = String(movie.rating);
}

function createBgImage(): HTMLImageElement {
  const img = document.createElement("img");
  img.className = "background-image";
  img.alt = "";
  return img;
}

function createTopRatedContainer(detailButton: HTMLButtonElement): HTMLElement {
  const container = document.createElement("div");
  container.className = "top-rated-container";

  const topRatedMovie = document.createElement("div");
  topRatedMovie.className = "top-rated-movie";

  const rateDiv = document.createElement("div");
  rateDiv.className = "rate";

  const starImg = document.createElement("img");
  starImg.src = starIconSrc;
  starImg.className = "star";

  const rateValue = document.createElement("span");
  rateValue.className = "rate-value";

  rateDiv.append(starImg, rateValue);

  const titleDiv = document.createElement("div");
  titleDiv.className = "title";

  topRatedMovie.append(rateDiv, titleDiv, detailButton);
  container.appendChild(topRatedMovie);
  return container;
}
