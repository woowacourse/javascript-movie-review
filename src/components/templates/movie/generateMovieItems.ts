import { HTMLTemplate } from "../../abstract/BaseComponent";
import IMAGES from "../../../images";
import { MovieItem } from "../../../types/movie";

export type Path = string;

const generateMovieItem = (movie: MovieItem): HTMLTemplate => {
  const { id, title, posterSrc, voteAverage } = movie;

  return `
  <li class="movie-item" data-movie-id="${id}">
    <div class="item-card">
      <img class="item-thumbnail" src="${posterSrc}" loading="lazy" alt="${title}" />
      <p class="item-title">${title}</p>
      <p class="item-score">
        <img src="${IMAGES.starFilled}" alt="별점" />
        ${voteAverage}
      </p>
    </div>
  </li>
  `;
};

export const generateMovieItems = (movies: MovieItem[]) => {
  return movies.reduce((movieListTemplate, movieInfo) => {
    return movieListTemplate + generateMovieItem(movieInfo);
  }, "");
};
