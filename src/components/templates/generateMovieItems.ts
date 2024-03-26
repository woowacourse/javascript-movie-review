import { HTMLTemplate } from "../../types/common";
import IMAGES from "../../images";
import { FetchedMovieData, Movie } from "../../types/movies";

export type Path = string;

const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w220_and_h330_face";

const generateMovieItem = (movie: Movie): HTMLTemplate => {
  const { title, poster_path, vote_average } = movie;
  return `
    <li>
      <a href="#">
        <div class="item-card">
          <img class="item-thumbnail" src="${BASE_POSTER_URL}${poster_path}" loading="lazy" alt="${title}" />
          <p class="item-title">${title}</p>
          <p class="item-score">
            <img src="${IMAGES.starFilled}" alt="별점" />
            ${vote_average}
          </p>
        </div>
      </a>
    </li>
  `;
};

export const generateMovieItems = (data: FetchedMovieData): HTMLTemplate => {
  const movieItems = data.results.map((movieInfo) =>
    generateMovieItem(movieInfo)
  );
  return movieItems.join("");
};
