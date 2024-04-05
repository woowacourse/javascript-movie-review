import "./movieItemModal.style.css"; // NOTE: 모달만 import 없으면 css

import StarRatings from "../StarRatings/StarRatings";

import modalCloseButtonImg from "../../image/modal_close_button.png";
import starFilledImg from "../../image/star_filled.png";

import { $, createElement } from "../../utility/dom";
import { getMovieDetailsData } from "../../api/getMovieDetailsData";

class MovieItemModal {
  starRatings: StarRatings;

  constructor() {
    this.starRatings = new StarRatings();
  }

  closeModal() {
    const modalBackdrop = $(".modal-backdrop") as HTMLDivElement;
    const modalElement = $("dialog") as HTMLDialogElement;

    document.body.style.overflow = "auto";
    modalBackdrop.style.display = "none";
    modalElement.style.display = "none";
  }

  openModal() {
    const modalBackdrop = $(".modal-backdrop") as HTMLDivElement;
    const modalElement = $("dialog") as HTMLDialogElement;

    document.body.style.overflow = "hidden";
    modalBackdrop.style.display = "block";
    modalElement.style.display = "block";
  }

  closeModalOnEsc(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this.closeModal();
    }
  }

  setModalCloseHandler() {
    window.addEventListener("keydown", this.closeModalOnEsc.bind(this));

    const modalElement = $(".modal-backdrop") as HTMLDivElement;
    const closeBtn = modalElement.querySelector(
      ".modal-close-btn"
    ) as HTMLButtonElement;

    closeBtn.addEventListener("click", () => {
      this.closeModal();
    });
  }

  async setModalContent(movieId: string) {
    const movieDetails = await getMovieDetailsData(movieId);

    const movieItemModal = $("dialog") as HTMLDialogElement;

    const title = movieItemModal.querySelector(
      ".modal-title"
    ) as HTMLHeadingElement;
    title.textContent = movieDetails.title;

    const thumbnail = movieItemModal.querySelector(
      ".modal-item-thumbnail"
    ) as HTMLImageElement;
    thumbnail.src = `https://image.tmdb.org/t/p/w220_and_h330_face${movieDetails.poster_path}`;
    thumbnail.alt = "";

    const overview = movieItemModal.querySelector(
      ".modal-movie-overview"
    ) as HTMLDivElement;

    overview.textContent =
      movieDetails.overview.length > 0
        ? movieDetails.overview
        : "영화 줄거리 정보가 없습니다.";

    const genres = movieItemModal.querySelector(
      ".modal-genres"
    ) as HTMLDivElement;
    const genresList = movieDetails.genres as IGenre[];
    const genreNames = genresList
      .map((item: { name: string }) => {
        return item.name;
      })
      .join(", ");

    genres.textContent = genreNames;

    const starImg = movieItemModal.querySelector(
      ".modal-filled-star"
    ) as HTMLImageElement;
    starImg.src = starFilledImg;

    const score = movieItemModal.querySelector(
      ".modal-item-score"
    ) as HTMLSpanElement;
    score.textContent = String(movieDetails.vote_average.toFixed(1));

    this.starRatings.setMovieId(Number(movieId));
    this.starRatings.initMyScoreSection(Number(movieId));
  }

  #createHeader() {
    const modalHeader = createElement("header", {
      class: "modal-header",
    });

    const movieTitleElement = createElement("h3", {
      class: "modal-title",
    });

    const modalCloseButton = createElement("button", {
      class: "modal-close-btn",
      type: "button",
    });

    const modalCloseImg = createElement("img", {
      alt: "modal-close-button-img",
      src: modalCloseButtonImg,
    });
    modalCloseButton.appendChild(modalCloseImg);

    modalHeader.appendChild(movieTitleElement);
    modalHeader.appendChild(modalCloseButton);

    return modalHeader;
  }

  #createModalContent() {
    const modalContent = createElement("section", {
      class: "modal-content",
    });

    const leftModalContentWrapper = createElement("div", {
      class: "left-modal-content-wrapper",
    });
    modalContent.appendChild(leftModalContentWrapper);

    const thumbnail = createElement("img", {
      class: "modal-item-thumbnail skeleton",
      loading: "lazy",
      alt: "",
    }) as HTMLImageElement;
    leftModalContentWrapper.appendChild(thumbnail);

    const rightModalContentWrapper = createElement("div", {
      class: "right-modal-content-wrapper",
    });
    modalContent.appendChild(rightModalContentWrapper);

    const tagSection = createElement("section", {
      class: "tab-section",
    });
    const genresElement = createElement("div", {
      class: "modal-genres",
    });

    const scoreWrapper = createElement("div", {
      class: "modal-item-score-wrapper",
    });
    const starImg = createElement("img", {
      class: "modal-filled-star",
      alt: "starFilledImg for grade",
    }) as HTMLImageElement;
    const score = createElement("span", {
      class: "modal-item-score skeleton",
    });
    scoreWrapper.appendChild(starImg);
    scoreWrapper.appendChild(score);

    tagSection.appendChild(genresElement);
    tagSection.appendChild(scoreWrapper);

    rightModalContentWrapper.appendChild(tagSection);

    // NOTE: 줄거리
    const overviewSection = createElement("section", {
      class: "modal-movie-overview-wrapper",
    });

    const overview = createElement("div", {
      class: "modal-movie-overview",
    });
    overviewSection.appendChild(overview);

    rightModalContentWrapper.appendChild(overviewSection);

    // NOTE: 내 별점
    const myscoreSection = createElement("section", {
      class: "my-score-section",
    });
    rightModalContentWrapper.appendChild(myscoreSection);

    const myscoreButtonDescription = createElement("label", {
      class: "myscore-button-description",
    });
    myscoreButtonDescription.textContent = "내 별점";
    myscoreSection.appendChild(myscoreButtonDescription);

    const myStarRatings = this.starRatings.createStarRatings();
    myscoreSection.appendChild(myStarRatings);

    const myscore = createElement("label", {
      class: "myscore-ratings",
    });
    myscore.textContent = "0"; // TODO: 상수로 수정
    myscoreSection.appendChild(myscore);

    const myscoreDescription = createElement("label", {
      class: "myscore-description",
    });
    myscoreDescription.textContent = "";
    myscoreSection.appendChild(myscoreDescription);

    return modalContent;
  }

  getModal() {
    const modalBackdrop = createElement("div", {
      class: "modal-backdrop",
    });
    modalBackdrop.style.display = "none";

    const movieItemModal = createElement("dialog");

    const modalHeader = this.#createHeader();

    const modalContent = this.#createModalContent();

    movieItemModal.appendChild(modalHeader);
    movieItemModal.appendChild(modalContent);

    modalBackdrop.appendChild(movieItemModal);

    return modalBackdrop;
  }
}

export default MovieItemModal;
