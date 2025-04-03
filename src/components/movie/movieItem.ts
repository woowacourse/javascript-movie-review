import { getDetailMovies } from "../../apis/getDetailMovies";
import handleModalEvents from "../modal/handleModalEvents";
import movieDetailModal from "../modal/movieDetailModal";
import {
  createElementWithAttributes,
  ElementOptions,
} from "../utils/createElementWithAttributes";
import { $ } from "../utils/selectors";
import { Movie } from "./types";
import noImage from "/images/no_image.png";
import placeholderImage from "/images/placeholder_poster.svg";

const movieItem = (movie: Movie): HTMLElement => {
  const movieItemOptions: ElementOptions = {
    tag: "li",
    className: "item",
    children: [
      {
        tag: "img",
        className: "thumbnail",
        onload: function () {
          if (this instanceof HTMLImageElement === false) {
            return;
          }

          this.src =
            movie.poster_path === null
              ? noImage
              : `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`;
        },
        attributes: {
          src: placeholderImage,
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
                textContent: String(movie.vote_average).slice(0, 3),
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
    const $modal = $(".modal");

    if ($modal instanceof HTMLDialogElement) {
      const detailMovie = await getDetailMovies(movie.id);

      $modal.replaceChildren(movieDetailModal(detailMovie));
      handleModalEvents($modal);
      $modal.showModal();
    }
  });

  return $movieItemOptions;
};

export default movieItem;
