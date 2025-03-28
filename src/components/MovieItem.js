import Modal from "./Modal";
import MoviePreviewInfo from "./MoviePreviewInfo";
import createElement from "./utils/createElement";
import imageUrl from "../utils/imageUrl";
import nullImage from "../../images/nullImage.png";
import fetchDetailsMovie from "../fetch/fetchDetailsMovie";

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
    src: posterPath ? `${imageUrl(posterPath)}` : nullImage,
    alt: `${title}`,
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
    const movieDetails = await fetchDetailsMovie(movie.id);
    const $wrap = document.querySelector("#wrap");
    $wrap.appendChild(Modal({movieDetails}));
  });
  

  return $li;
};

export default MovieItem;
