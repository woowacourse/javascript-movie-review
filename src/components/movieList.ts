import {
  createElementWithAttributes,
  ElementOptions,
} from "./utils/createElementWithAttributes";

import { $ } from "./utils/selectors";

interface MovieList {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const movieList = (movies: MovieList[]) => {
  const $movieList = createElementWithAttributes({
    tag: "ul",
    className: "thumbnail-list",
    children: movies.map(
      (movie): ElementOptions => ({
        tag: "li",
        className: "item",
        children: [
          {
            tag: "img",
            className: "thumbnail",
            attributes: {
              src: `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`,
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
      })
    ),
  });

  const $container = $(".movie-list");
  if ($container instanceof Element === false) {
    return;
  }

  $container.append($movieList);
};

export default movieList;
