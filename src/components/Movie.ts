import { MovieType } from "../types";
import { starImage } from "../assets/image";

export const createMovieElement = ({ id, title, thumbnail, voteAverage }: MovieType) => {
  const listItem = document.createElement("li");
  listItem.id = String(id);
  listItem.innerHTML = /*html*/ `
    <a href="#">
      <div class="item-card">
        <img
        class="item-thumbnail"
        src="${thumbnail}"
        loading="lazy"
        alt="${title}"
        />
        <p class="item-title">${title}</p>
        <p class="item-score">
        <img src="${starImage}" alt="별점" /> ${voteAverage.toFixed(1)}
        </p>
      </div>
    </a> 
`;

  return listItem;
};
