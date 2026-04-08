import starIconSrc from "../../templates/images/star_empty.png";

interface MovieCardOptions {
  title: string;
  posterSrc: string;
  rating: number;
}

export function createMovieCard({
  title,
  posterSrc,
  rating,
}: MovieCardOptions): HTMLLIElement {
  const li = document.createElement("li");

  const item = document.createElement("div");
  item.className = "item";

  item.append(createThumbnail(title, posterSrc), createItemDesc(title, rating));
  li.appendChild(item);

  return li;
}

function createThumbnail(title: string, posterSrc: string): HTMLImageElement {
  const thumbnail = document.createElement("img");
  thumbnail.className = "thumbnail";
  thumbnail.src = posterSrc;
  thumbnail.alt = title;
  thumbnail.onerror = () => {
    thumbnail.style.display = "none";
    const fallback = document.createElement("div");
    fallback.className = "thumbnail thumbnail-fallback";
    fallback.textContent = title;
    thumbnail.parentElement?.insertBefore(fallback, thumbnail);
  };
  return thumbnail;
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
