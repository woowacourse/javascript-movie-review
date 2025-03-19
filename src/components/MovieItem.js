import MovieCaption from "./MovieCaption";
import ThumbnailImage from "./ThumbnailImage";

function MovieItem() {
  const $movieItem = document.createElement("li");
  const $movieItemContainer = document.createElement("div");
  $movieItemContainer.classList.add("item");

  const thumbnailImage = ThumbnailImage({
    title: this.title,
    imagePath: this.poster_path,
  });
  const movieCaption = MovieCaption({
    title: this.title,
    vote_average: this.vote_average,
  });

  $movieItemContainer.appendChild(thumbnailImage);
  $movieItemContainer.appendChild(movieCaption);
  $movieItem.appendChild($movieItemContainer);

  return $movieItem;
}

export default MovieItem;
