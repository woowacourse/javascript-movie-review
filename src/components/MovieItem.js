import Modal from "./Modal";
import MoviePreviewInfo from "./MoviePreviewInfo";
import createElement from "./utils/createElement";
import nullImage from "../../images/nullImage.png";
import fetchDetailsMovie from "../fetch/fetchDetailsMovie";
import { proxiedImageUrl } from "../fetch/utils/imageProxy";
import MovieItemModal from "./MovieItemModal";

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
    const movieDetails = await fetchDetailsMovie(movie.id);
    const initialRate =
      Number(localStorage.getItem(String(movieDetails.id))) || 0;
    const $modal = Modal({
      content: MovieItemModal(movieDetails, initialRate),
      onOpen: () => document.querySelector(".gnb")?.classList.add("disappear"),
      onClose: () =>
        document.querySelector(".gnb")?.classList.remove("disappear"),
    });

    document.body.appendChild($modal);
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
