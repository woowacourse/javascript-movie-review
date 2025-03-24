import { MovieItemProps } from "../../types/domain";

const MovieItem = {
  create({ id, posterPath, rate, title }: MovieItemProps) {
    const movieItemElement = document.createElement("li");
    movieItemElement.dataset.id = id.toString();
    const content = /*html*/ `
        <div class="item">
            <img
            class="thumbnail"
            src=${posterPath}
            onerror="this.src='./images/null_image.png'"
            alt=${title}
            />
            <div class="item-desc">
            <p class="rate">
                <img src="./images/star_empty.png" class="star" /><span
                >${rate}</span
                >
            </p>
            <strong>${title}</strong>
            </div>
        </div>
    `;

    movieItemElement.insertAdjacentHTML("beforeend", content);
    console.log(movieItemElement);
    return movieItemElement;
  },
};

export default MovieItem;
