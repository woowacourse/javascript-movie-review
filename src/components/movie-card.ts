import starIconSrc from "../../templates/images/star_empty.png";
import { createPoster } from "./poster";

interface MovieCardOptions {
  id: number;
  title: string;
  posterSrc: string | null;
  rating: number;
}

export function createMovieCard({
  id,
  title,
  posterSrc,
  rating,
}: MovieCardOptions): HTMLLIElement {
  const li = document.createElement("li");
  li.dataset.id = String(id);

  const item = document.createElement("div");
  item.className = "item";

  item.append(createPoster(posterSrc, title), createItemDesc(title, rating));
  li.appendChild(item);

  return li;
}


function createItemDesc(title: string, rating: number): HTMLDivElement {
  const itemDesc = document.createElement("div");
  itemDesc.className = "item-desc";

  const rateP = document.createElement("p");
  rateP.className = "rate";

  const starImg = document.createElement("img");
  starImg.src = starIconSrc;
  starImg.className = "star";

  const rateSpan = document.createElement("span");
  rateSpan.textContent = String(rating);

  rateP.append(starImg, rateSpan);

  const titleStrong = document.createElement("strong");
  titleStrong.textContent = title;

  itemDesc.append(rateP, titleStrong);
  return itemDesc;
}
