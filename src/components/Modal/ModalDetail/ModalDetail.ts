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
    const modalDetailElement = document.createElement("div");
    modalDetailElement.classList.add("modal-detail");
    const content = /*html*/ `
        <div class="modal-image">
            <img
            src=${DETAIL_POSTER_PREFIX + posterPath}
            onerror="this.src='./images/null_image.png'"
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
    modalDetailElement.insertAdjacentHTML("beforeend", content);
    this.createMyRate(modalDetailElement, id);
    return modalDetailElement;
  },

  createMyRate(modalContainerElement: HTMLDivElement, movieId: number) {
    const myRateSelect = MyRateSelect.create(movieId);

    modalContainerElement
      .querySelector(".my-rate-container")
      ?.appendChild(myRateSelect);
  },
};

export default ModalDetail;
