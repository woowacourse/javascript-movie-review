import { ThumbnailInfo } from "../../types/movie";
import fallbackImg from "../assets/movie_fallback_image.svg";

export const createMovieThumbnail = (movie: ThumbnailInfo) => {
  const fragment = document.createDocumentFragment();
  const list = document.createElement("li");

  const item = document.createElement("div");
  item.className = "item";
  item.dataset.movieId = String(movie.id);

  const thumbnail = document.createElement("img");
  thumbnail.className = "thumbnail";
  thumbnail.src = movie.poster_path
    ? `${import.meta.env.VITE_TMDB_IMG_URL}${movie.poster_path}`
    : fallbackImg;
  thumbnail.alt = movie.title;

  const itemDesc = document.createElement("div");
  itemDesc.className = "item-desc";

  const rate = document.createElement("p");
  rate.className = "rate";

  const starImg = document.createElement("img");
  starImg.className = "star";
  starImg.src = "./templates/images/star_empty.png";

  const voteAverage = document.createElement("span");
  voteAverage.textContent = movie.vote_average.toString();

  const title = document.createElement("strong");
  title.textContent = movie.title;

  rate.appendChild(starImg);
  rate.appendChild(voteAverage);

  itemDesc.appendChild(rate);
  itemDesc.appendChild(title);

  item.appendChild(thumbnail);
  item.appendChild(itemDesc);

  list.appendChild(item);
  fragment.appendChild(list);

  return fragment;
};
