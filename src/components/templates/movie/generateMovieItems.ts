import { HTMLTemplate } from "../../abstract/BaseComponent";
import IMAGES from "../../../images";
import { Movie } from "../../../types/movie";

export type Path = string;

const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w220_and_h330_face";

const generateMovieItem = (movie: Movie): HTMLTemplate => {
  const { title, posterPath, voteAverage } = movie;

  return `
  <li>
    <a href="#">
      <div class="item-card">
        <img class="item-thumbnail" src="${BASE_POSTER_URL}${posterPath}" loading="lazy" alt="${title}" />
        <p class="item-title">${title}</p>
        <p class="item-score">
          <img src="${IMAGES.starFilled}" alt="별점" />
          ${voteAverage}
        </p>
      </div>
    </a>
  </li>
  `;
};

export const generateMovieItems = (movies: Movie[]) => {
  return movies.reduce((movieListTemplate, movieInfo) => {
    return movieListTemplate + generateMovieItem(movieInfo);
  }, "");
};
