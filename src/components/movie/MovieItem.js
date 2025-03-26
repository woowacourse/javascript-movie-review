import MoviePreviewInfo from "./MoviePreviewInfo";
import createElement from "../utils/createElement";
import imageUrl from "../../utils/imageUrl";

const MovieItem = ({ movie }) => {
  const title = movie?.title;
  const posterPath = movie?.poster_path;

  const $li = createElement({
    tag: "li",
    classNames: ["open_modal"],
  });

  const $div = createElement({
    tag: "div",
    classNames: ["item"],
  });

  const $img = createElement({
    tag: "img",
    classNames: ["thumbnail"],
    src: `${imageUrl(posterPath)}`,
    alt: `${title}`,
  });

  $li.appendChild($div);
  $div.appendChild($img);
  $div.appendChild(
    MoviePreviewInfo({
      movie,
      bigFont: false,
    })
  );

  return $li;
};

export default MovieItem;
