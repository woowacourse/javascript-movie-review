import { ThumbnailInfo, Movie } from "../types/movie";
import EmptyStarIcon from "./assets/star_empty.png";
import NotFoundPoster from "./assets/notFoundImage.png";

export const extractThumbnailInfo = (movies: Movie[]) => {
  return movies.map((movie) => {
    const thumbnailInfo: ThumbnailInfo = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    };

    return thumbnailInfo;
  });
};

export const makeMovieThumbnail = (movie: ThumbnailInfo) => {
  const fragment = document.createDocumentFragment();
  const list = document.createElement("li");
  list.className = "thumbnail-container";
  list.dataset.movieId = movie.id.toString();

  const item = document.createElement("div");
  item.className = "item";

  const thumbnail = document.createElement("img");
  thumbnail.className = "thumbnail";
  thumbnail.src = `${import.meta.env.VITE_TMDB_IMG_URL}${movie.poster_path}`;
  thumbnail.onerror = () => {
    thumbnail.src = NotFoundPoster;
  };
  thumbnail.alt = movie.title;

  const itemDesc = document.createElement("div");
  itemDesc.className = "item-desc";

  const rate = document.createElement("p");
  rate.className = "rate";

  const starImg = document.createElement("img");
  starImg.className = "star";
  starImg.src = EmptyStarIcon;

  const voteAverage = document.createElement("span");
  voteAverage.textContent = movie.vote_average.toFixed(1).toString();

  const title = document.createElement("strong");
  title.className = "thumbnail-title";
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
