import { Movie } from "../main";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieList = (movies: Movie[]) => {
  const posterImage = (poster_path: Movie["poster_path"]) => {
    return poster_path
      ? `${IMAGE_BASE_URL}${poster_path}`
      : "./images/null_image.png";
  };

  return /*html*/ `
    ${movies
      .map(
        ({ poster_path, title, vote_average }) => /*html*/ `
        <li>
            <div class="item">
                <img
                class="thumbnail"
                src="${posterImage(poster_path)}"
                alt="${title}"
                />
                <div class="item-desc">
                <p class="rate">
                    <img src="./images/star_empty.png" class="star" /><span
                    >${vote_average}</span
                    >
                </p>
                <strong>${title}</strong>
                </div>
            </div>
        </li>
    `
      )
      .join("")}  
    `;
};

export default MovieList;
