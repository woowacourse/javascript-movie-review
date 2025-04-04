import MoviePreviewInfo from "./MoviePreviewInfo";
import createElement from "../utils/createElement";
import imageUrl from "../../utils/imageUrl";
import { fetchDetailMovie } from "../../fetch/fetchDetailMovies";
import Modal from "./movieModal/Modal";

const MovieItem = ({ movie }) => {
  const { title, poster_path, id } = movie;

  const $li = createElement({
    tag: "li",
    classNames: ["open_modal"],
  });

  const $div = createElement({
    tag: "div",
    classNames: ["item"],
    dataset: {
      id: movie.id.toString(),
    },
  });

  const $img = createElement({
    tag: "img",
    classNames: ["thumbnail"],
    src: imageUrl(poster_path),
    alt: title,
  });

  $li.appendChild($div);
  $div.appendChild($img);
  $div.appendChild(
    MoviePreviewInfo({
      movie,
      bigFont: false,
    })
  );

  $li.addEventListener("click", async () => {
    const movieDetailData = await fetchDetailMovie(id);

    new Modal(movieDetailData, id);
  });
  return $li;
};

export default MovieItem;
