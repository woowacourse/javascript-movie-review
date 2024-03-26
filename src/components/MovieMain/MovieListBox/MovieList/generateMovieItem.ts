import { Movie } from "./MovieItem";
import STAR from "../../../../../templates/star_filled.png";
import createElement from "../../../utils/createElement";

const generateMovieItem = ({
  id,
  korTitle,
  posterPath,
  voteAverage,
}: Movie) => {
  const $div = generateItemCard({
    korTitle,
    posterPath,
    voteAverage,
  });

  const $a = createElement({
    tagName: "a",
    attribute: { href: "#" },
    children: [$div],
  });

  const $li = createElement({
    tagName: "li",
    attribute: {
      id: `movie-item-${id}`,
    },
    children: [$a],
  });

  return $li;
};

const generateItemCard = ({
  korTitle,
  posterPath,
  voteAverage,
}: {
  korTitle: string;
  posterPath: string;
  voteAverage: number;
}) => {
  const $img = generatePoster(posterPath, korTitle);

  const $title = generateTitle(korTitle);

  const $voteAverage = generateVoteAverage(voteAverage);

  const $div = createElement({
    tagName: "div",
    attribute: {
      class: "item-card",
    },
    children: [$img, $title, $voteAverage],
  });

  return $div;
};

const generateTitle = (korTitle: string) => {
  return createElement({
    tagName: "p",
    attribute: {
      class: "item-title",
    },
    children: [korTitle],
  });
};

const generatePoster = (posterPath: string, korTitle: string) => {
  return createElement({
    tagName: "img",
    attribute: {
      class: "item-thumbnail",
      loading: "lazy",
      src: `https://image.tmdb.org/t/p/w500${posterPath}`,
      alt: korTitle,
    },
  });
};

const generateVoteAverage = (voteAverage: number) => {
  const $img = createElement({
    tagName: "img",
    attribute: {
      src: STAR,
      alt: "별점",
    },
  });

  const $p = createElement({
    tagName: "p",
    attribute: {
      class: "item-score",
    },
    children: [$img, voteAverage.toString()],
  });

  return $p;
};
