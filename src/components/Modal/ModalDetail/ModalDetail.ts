import { MovieDetailProps } from "../../../../types/domain";
import { MOVIE_NO_DESCRIPTION } from "../../../constants/MovieRate";
import { CATEGORY_SEPARATOR } from "../../../constants/UI";
import { DETAIL_POSTER_PREFIX } from "../../../constants/URL";
import MyRateSelect from "../../MyRateSelect";

const ModalDetail = {
  create({
    id,
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
            <p class="detail">${
              detail !== "" ? detail : MOVIE_NO_DESCRIPTION
            }</p>
        </div>
    `;
    modalContainerElement.insertAdjacentHTML("beforeend", content);
    this.createMyRate(modalContainerElement, id);
    return modalContainerElement;
  },

  createMyRate(modalContainerElement: HTMLDivElement, movieId: number) {
    const myRateSelect = MyRateSelect.create(movieId);

    modalContainerElement
      .querySelector(".my-rate-container")
      ?.appendChild(myRateSelect);
  },
};

export default ModalDetail;
