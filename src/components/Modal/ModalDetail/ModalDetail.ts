import { MovieDetailProps } from "../../../../types/domain";
import { CATEGORY_SEPARATOR } from "../../../constants/UI";
import { DETAIL_POSTER_PREFIX } from "../../../constants/URL";

const ModalDetail = {
  create({
    posterPath,
    title,
    releaseYear,
    category,
    rate,
    detail,
  }: MovieDetailProps) {
    const modalContainerElement = document.createElement("div");
    modalContainerElement.classList.add("modal-container");
    const content = /*html*/ `
        <div class="modal-image">
            <img
            src=${DETAIL_POSTER_PREFIX + posterPath}
            />
        </div>
        <div class="modal-description">
            <h2>${title}</h2>
            <p class="category">
            ${releaseYear} · ${category.join(CATEGORY_SEPARATOR)}
            </p>
            <p class="rate">
            <img src="./images/star_filled.png" class="star" /><span
                >${rate}</span
            >
            </p>
            <hr />
            <p class="detail">${detail}</p>
        </div>
    `;
    modalContainerElement.insertAdjacentHTML("beforeend", content);
    return modalContainerElement;
  },
};

export default ModalDetail;
