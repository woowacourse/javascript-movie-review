import { Movie } from "../../types";

import starImg from "../../../templates/star_filled.png";

export const getMovieCardTemplate = (movie: Movie) => {
  return (
    /*html*/
    `
      <li data-movie-id="${movie.id}">
          <div class="item-card">
            ${
              movie.poster_path
                ? /*html */ `
                  <img
                    class="item-thumbnail skeleton"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}"
                    loading="lazy"
                    alt="${movie.title}"
                  />
                `
                : /*html */ `
                <div class="item-thumbnail center" style="background-color:white; color:black; display:flex; justify-content:center; align-items:center; font-weight:600; font-size:24px">
                  <span>No Image</span>
                </div>
                `
            }
            <p class="item-title">${movie.title}</p>
            <p class="item-score">
              <img src="${starImg}" alt="별점 ${movie.vote_average}" />
              ${movie.vote_average}
            </p>
          </div>
      </li>
    `
  );
};
