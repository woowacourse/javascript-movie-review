import { MovieDetailProps } from "../../../../types/domain";
import { CATEGORY_SEPARATOR } from "../../../constants/UI";
import { DETAIL_POSTER_PREFIX } from "../../../constants/URL";
import MyRateSelect from "../../MyRateSelect";

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
            <div class="rate-container">
              <p>평균</p>
              <p class="rate">
              <img src="./images/star_filled.png" class="star" /><span
                  >${rate}</span
              >
              </p>
            </div>
            <hr />
            <p class="subtitle">내 별점</p>
            <div class="my-rate-container"></div>
            <hr />
            <p class="subtitle">줄거리</p>
            <p class="detail">${detail}</p>
        </div>
    `;
    modalContainerElement.insertAdjacentHTML("beforeend", content);
    this.createMyRate(modalContainerElement);
    return modalContainerElement;
  },

  createMyRate(modalContainerElement: HTMLDivElement) {
    const myRateSelect = MyRateSelect.create();

    modalContainerElement
      .querySelector(".my-rate-container")
      ?.appendChild(myRateSelect);
  },
};

export default ModalDetail;
