import MovieCaption from "./MovieCaption";
import ThumbnailImage from "./ThumbnailImage";

function MovieItem({ id, title, poster_path, vote_average }) {
  const $movieItem = document.createElement("li");
  const $movieItemContainer = document.createElement("div");
  $movieItemContainer.classList.add("item");

  const thumbnailImage = ThumbnailImage({
    id,
    title,
    poster_path,
  });
  const movieCaption = MovieCaption({
    title,
    vote_average,
  });

  $movieItemContainer.appendChild(thumbnailImage);
  $movieItemContainer.appendChild(movieCaption);
  $movieItem.appendChild($movieItemContainer);

  return $movieItem;
}

export default MovieItem;
