import { MovieDetail } from "../../domain/types";
import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import movieDetailDescription from "./movieDetailModal/internal/movieDetailDescription";
import noImage from "/images/no_image.png";

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
            attributes: {
              src:
                movie.poster_path === null
                  ? noImage
                  : `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`,
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
