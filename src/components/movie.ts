import { Movie } from "../types/api";
import starIconSrc from "../images/star_empty.png";
import { IMAGE_BASE_URL } from "../utils/constants";

export function createMovieList(movies: Movie[]): HTMLElement {
  const section = document.createElement("section");

  const ul = document.createElement("ul");
  ul.className = "thumbnail-list";

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    ul.appendChild(card);
  });

  section.append(ul);
  return section;
}

export function createMovieCard({
  title,
  poster_path: posterImg,
  vote_average: rating,
}: Movie): HTMLLIElement {
  const li = document.createElement("li");

  const item = document.createElement("div");
  item.className = "item";

  const thumbnail = document.createElement("img");
  thumbnail.className = "thumbnail";
  thumbnail.src = `${IMAGE_BASE_URL}/w500${posterImg}`;
  thumbnail.alt = title;

  const itemDesc = document.createElement("div");
  itemDesc.className = "item-desc";

  const rateP = document.createElement("p");
  rateP.className = "rate";

  const starImg = document.createElement("img");
  starImg.src = starIconSrc;
  starImg.className = "star";

  const rateSpan = document.createElement("span");
  rateSpan.textContent = (rating ?? 0).toFixed(1);

  rateP.append(starImg, rateSpan);

  const titleStrong = document.createElement("strong");
  titleStrong.textContent = title;

  itemDesc.append(rateP, titleStrong);
  item.append(thumbnail, itemDesc);
  li.appendChild(item);

  return li;
}
