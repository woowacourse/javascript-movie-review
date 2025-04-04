import MovieCaption from "./MovieCaption";
import ThumbnailImage from "./ThumbnailImage";

function MovieItem(
  { id, title, poster_path, vote_average },
  onClick = () => {}
) {
  const $movieItem = document.createElement("li");
  const $movieItemContainer = document.createElement("div");

  $movieItemContainer.classList.add("item");
  $movieItem.dataset.id = id.toString();

  const thumbnailImage = ThumbnailImage({
    title,
    poster_path,
  });
  const movieCaption = MovieCaption({
    title,
    vote_average,
  });

  $movieItem.addEventListener("click", (event) => onClick(event));
  $movieItemContainer.appendChild(thumbnailImage);
  $movieItemContainer.appendChild(movieCaption);
  $movieItem.appendChild($movieItemContainer);

  return $movieItem;
}

export default MovieItem;
