import { MovieItemProps } from "../../types/domain";
import { POSTER_IMG_PREFIX } from "../constants/URL";

const MovieItem = {
  create({ id, posterPath, rate, title }: MovieItemProps) {
    const movieItemElement = document.createElement("li");
    movieItemElement.dataset.id = id.toString();
    const content = /*html*/ `
        <div class="item">
            <img
            class="thumbnail"
            src=${POSTER_IMG_PREFIX + posterPath}
            onerror="this.src='./images/null_image.png'"
            alt=${title}
            />
            <div class="item-desc">
            <p class="rate">
                <img src="./images/star_empty.png" class="star" /><span
                >${rate.toFixed(1)}</span
                >
            </p>
            <strong>${title}</strong>
            </div>
        </div>
    `;

    movieItemElement.insertAdjacentHTML("beforeend", content);
    return movieItemElement;
  },
};

export default MovieItem;
