import MoviePreviewInfo from "./MoviePreviewInfo";
import createElement from "./utils/createElement";
import nullImage from "../../images/nullImage.png";
import { proxiedImageUrl } from "../fetch/utils/imageProxy";
import openMovieModal from "./utils/openMovieModal";

const MovieItem = ({ movie }) => {
  const title = movie?.title;
  const posterPath = movie?.poster_path;

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
    }
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
  
  if(!localStorage.getItem(movie.id)) {
    localStorage.setItem(
      String(movie.id),
      "0"
    );

  }

  return $li;
};

export default MovieItem;
