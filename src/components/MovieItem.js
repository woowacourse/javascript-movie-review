import MoviePreviewInfo from "./MoviePreviewInfo";
import { proxiedImageUrl } from "../fetch/utils/imageProxy";
import ratingStorage from "../store/RatingStorage";
import createElement from "./utils/createElement";
import openMovieModal from "./utils/openMovieModal";
import nullImage from "../../images/nullImage.png";

const MovieItem = ({ movie }) => {
  const title = movie?.title;
  const posterPath = movie?.poster_path;
  const movieId = String(movie.id);

  const $li = createElement({
    tag: "li",
  });

  const $div = createElement({
    tag: "div",
    classNames: ["item"],
  });

  const $img = createElement({
    tag: "img",
    classNames: ["thumbnail"],
    attributes: {
      src: posterPath ? `${proxiedImageUrl(posterPath)}` : nullImage,
      alt: `${title}`,
    },
  });

  $img.onerror = () => {
    $img.src = nullImage;
  };

  $li.appendChild($div);
  $div.appendChild($img);
  $div.appendChild(
    MoviePreviewInfo({
      movie,
      bigFont: false,
    })
  );

  $li.addEventListener("click", async () => {
    openMovieModal(movie);
  });

  if (!ratingStorage.has(movieId)) {
    ratingStorage.set(movieId, 0);
  }

  return $li;
};

export default MovieItem;
