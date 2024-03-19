import { MovieItem } from "../types/movies";

export const createMovie = ({ id, title, imgPath, voteAverage }: MovieItem) => {
  return /*html*/ `
    
    <li id="${id}">
        <a href="#">
        <div class="item-card">
            <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w220_and_h330_face/${imgPath}"
            loading="lazy"
            alt="${title}"
            />
            <p class="item-title">${title}</p>
            <p class="item-score">
            <img src="./star_filled.png" alt="별점" /> ${voteAverage}
            </p>
        </div>
        </a>
    </li>
    `;
};
