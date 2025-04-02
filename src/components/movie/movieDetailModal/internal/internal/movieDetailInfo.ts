import { MovieDetail } from "../../../../../domain/types";
import { createElementWithAttributes } from "../../../../utils/createElementWithAttributes";
import movieDetailDescription from "./internal/movieDetailDescription";
import noImage from "/images/no_image.png";
import placeholderImage from "/images/placeholder_poster.svg";

const movieDetailInfo = (movie: MovieDetail) => {
  const $movieDetailInfo = createElementWithAttributes({
    tag: "div",
    id: "modal-container",
    className: "modal-container",
    children: [
      {
        tag: "div",
        className: "modal-image",
        children: [
          {
            tag: "img",
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
              alt: "영화 포스터",
            },
          },
        ],
      },
    ],
  });

  $movieDetailInfo.append(movieDetailDescription(movie));

  return $movieDetailInfo;
};

export default movieDetailInfo;
