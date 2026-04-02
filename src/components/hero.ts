import { createDetailButton } from "./detail-button";
import starIconSrc from "../../templates/images/star_empty.png";

interface HeroOptions {
  backgroundImageUrl: string;
  rating: number;
  title: string;
  onDetailClick: () => void;
}

export function createHero({
  backgroundImageUrl,
  rating,
  title,
  onDetailClick,
}: HeroOptions): HTMLElement {
  const section = document.createElement("section");
  section.className = "hero";

  const backgroundContainer = document.createElement("div");
  backgroundContainer.className = "background-container";
  backgroundContainer.style.backgroundImage = `url(${backgroundImageUrl})`;

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.setAttribute("aria-hidden", "true");

  const topRatedContainer = document.createElement("div");
  topRatedContainer.className = "top-rated-container";

  const topRatedMovie = document.createElement("div");
  topRatedMovie.className = "top-rated-movie";

  const rateDiv = document.createElement("div");
  rateDiv.className = "rate";

  const starImg = document.createElement("img");
  starImg.src = starIconSrc;
  starImg.className = "star";

  const rateValue = document.createElement("span");
  rateValue.className = "rate-value";
  rateValue.textContent = String(rating);

  rateDiv.append(starImg, rateValue);

  const titleDiv = document.createElement("div");
  titleDiv.className = "title";
  titleDiv.textContent = title;

  const detailButton = createDetailButton(onDetailClick);

  topRatedMovie.append(rateDiv, titleDiv, detailButton);
  topRatedContainer.appendChild(topRatedMovie);
  backgroundContainer.append(overlay, topRatedContainer);
  section.appendChild(backgroundContainer);

  return section;
}
