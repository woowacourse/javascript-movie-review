import { DetailMovieData } from "../movie/types";
import { createRatingBox } from "../ratingBox/ratingBox";
import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import noImage from "/images/no_image.png";
import placeholderImage from "/images/placeholder_poster.svg";

const movieDetailModal = (detailMovie: DetailMovieData) => {
  const genres = detailMovie.genres.map((genre) => genre.name).join(", ");
  const releaseYear = new Date(detailMovie.release_date).getFullYear();

  const $movieDetailModal = createElementWithAttributes({
    tag: "div",
    className: "modal-container",
    children: [
      {
        tag: "button",
        id: "closeModal",
        className: "close-modal",
        children: [
          {
            tag: "img",
            attributes: { src: "./images/modal_button_close.png" },
          },
        ],
      },
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
                detailMovie.poster_path === null
                  ? noImage
                  : `https://image.tmdb.org/t/p/original/${detailMovie.poster_path}`;
            },
            attributes: {
              src: placeholderImage,
              alt: "movie poster",
            },
          },
        ],
      },
      {
        tag: "div",
        className: "modal-description",
        children: [
          {
            tag: "div",
            className: "movie-info-container",
            children: [
              {
                tag: "h2",
                textContent: `${detailMovie.title}`,
              },
              {
                tag: "p",
                className: "category",
                textContent: `${releaseYear} · ${genres}`,
              },
              {
                tag: "p",
                className: "rate",
                children: [
                  {
                    tag: "p",
                    className: "rate-text",
                    textContent: "평점",
                  },
                  {
                    tag: "img",
                    className: "star",
                    attributes: { src: "./images/star_filled.png" },
                  },
                  {
                    tag: "span",
                    className: "average-rate",
                    textContent: String(detailMovie.vote_average).slice(0, 3),
                  },
                ],
              },
            ],
          },
          {
            tag: "div",
            className: "my-star-container",
            children: [
              {
                tag: "h4",
                className: "modal-subtitle",
                textContent: "내 별점",
              },
              createRatingBox(detailMovie.id),
            ],
          },
          {
            tag: "div",
            className: "overview-container",
            children: [
              {
                tag: "h4",
                className: "modal-subtitle",
                textContent: "줄거리",
              },
              {
                tag: "p",
                className: "detail-overview",
                textContent: `${detailMovie.overview}`,
              },
            ],
          },
        ],
      },
    ],
  });

  return $movieDetailModal;
};
export default movieDetailModal;
