import { getDetailMovies } from "../../apis/getDetailMovies";
import movieDetailModal from "../modal/movieDetailModal";
import {
  createElementWithAttributes,
  ElementOptions,
} from "../utils/createElementWithAttributes";
import { $ } from "../utils/selectors";
import { Movie } from "./types";
import noImage from "/images/no_image.png";

const movieItem = (movie: Movie): HTMLElement => {
  const movieItemOptions: ElementOptions = {
    tag: "li",
    className: "item",
    children: [
      {
        tag: "img",
        className: "thumbnail",
        attributes: {
          src:
            movie.poster_path === null
              ? noImage
              : `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`,
          alt: movie.title,
        },
      },
      {
        tag: "div",
        className: "item-desc",
        children: [
          {
            tag: "p",
            className: "rate",
            children: [
              {
                tag: "img",
                className: "star",
                attributes: {
                  src: `./images/star_empty.png`,
                },
              },
              {
                tag: "span",
                textContent: String(movie.vote_average),
              },
            ],
          },
          { tag: "strong", textContent: movie.title },
        ],
      },
    ],
  };

  const $movieItemOptions = createElementWithAttributes(movieItemOptions);

  $movieItemOptions.addEventListener("click", async () => {
    const $modal = $(".modal") as HTMLDialogElement;
    const detailMovie = await getDetailMovies(movie.id);

    $modal.replaceChildren(movieDetailModal(detailMovie));
    $modal.showModal();
  });

  return $movieItemOptions;
};

export default movieItem;
