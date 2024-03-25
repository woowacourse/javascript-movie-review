import { MovieItem } from "../types/movies";
import { starImage } from "../assets/image";

export const createMovieElement = ({ id, title, backdrop_path, vote_average }: MovieItem) => {
  const listItem = document.createElement("li");
  listItem.id = String(id);
  listItem.innerHTML = /*html*/ `
    <a href="#">
      <div class="item-card">
        <img
        class="item-thumbnail"
        src="https://image.tmdb.org/t/p/w220_and_h330_face/${backdrop_path}"
        loading="lazy"
        alt="${title}"
        />
        <p class="item-title">${title}</p>
        <p class="item-score">
        <img src="${starImage}" alt="별점" /> ${vote_average.toFixed(1)}
        </p>
      </div>
    </a> 
`;

  return listItem;
};
