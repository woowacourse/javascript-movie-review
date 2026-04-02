interface MovieCardOptions {
  title: string;
  imageSrc: string;
  rating: number;
  starIconSrc: string;
}

export function createMovieCard({ title, imageSrc, rating, starIconSrc }: MovieCardOptions): HTMLLIElement {
  const li = document.createElement("li");

  const item = document.createElement("div");
  item.className = "item";

  const thumbnail = document.createElement("img");
  thumbnail.className = "thumbnail";
  thumbnail.src = imageSrc;
  thumbnail.alt = title;

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
  item.append(thumbnail, itemDesc);
  li.appendChild(item);

  return li;
}
