import { createButton } from "./button";
import starIconSrc from "../images/star_empty.png";

interface HeroOptions {
  backgroundImageUrl: string;
  rating: number;
  title: string;
}

export function createHero({
  backgroundImageUrl,
  rating,
  title,
}: HeroOptions): HTMLElement {
  const hero = document.createElement("div");
  hero.className = "hero";
  hero.appendChild(
    createBackgroundContainer(backgroundImageUrl, rating, title),
  );
  return hero;
}

function createBackgroundContainer(
  imageUrl: string,
  rating: number,
  title: string,
): HTMLElement {
  const backgroundContainer = document.createElement("div");
  backgroundContainer.className = "background-container";
  backgroundContainer.style.backgroundImage = `url(${imageUrl})`;

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.setAttribute("aria-hidden", "true");

  const topRatedContainer = document.createElement("div");
  topRatedContainer.className = "top-rated-container";
  topRatedContainer.appendChild(createTopRatedMovie(rating, title));

  backgroundContainer.append(overlay, topRatedContainer);
  return backgroundContainer;
}

function createTopRatedMovie(rating: number, title: string): HTMLElement {
  const topRatedMovie = document.createElement("div");
  topRatedMovie.className = "top-rated-movie";

  const titleDiv = document.createElement("div");
  titleDiv.className = "title";
  titleDiv.textContent = title;

  topRatedMovie.append(
    createRateSection(rating),
    titleDiv,
    createButton("detail", "자세히 보기"),
  );
  return topRatedMovie;
}

function createRateSection(rating: number): HTMLElement {
  const rateDiv = document.createElement("div");
  rateDiv.className = "rate";

  const starImg = document.createElement("img");
  starImg.src = starIconSrc;
  starImg.className = "star";

  const rateValue = document.createElement("span");
  rateValue.className = "rate-value";
  rateValue.textContent = String(rating);

  rateDiv.append(starImg, rateValue);
  return rateDiv;
}
