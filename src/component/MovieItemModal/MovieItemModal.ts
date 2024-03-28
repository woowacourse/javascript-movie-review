import "./movieItemModal.style.css"; // NOTE: 모달만 import 없으면 css

import starFilledImg from "../../image/star_filled.png";
import { $, createElement } from "../../utility/dom";
import { getMovieDetailsData } from "../../api/getMovieDetailsData";

class MovieItemModal {
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

    const thumbnail = movieItemModal.querySelector("img") as HTMLImageElement;
    thumbnail.src = `https://image.tmdb.org/t/p/w220_and_h330_face${movieDetails.poster_path}`;
    thumbnail.alt = "";

    const overview = movieItemModal.querySelector(
      ".modal-movie-overview"
    ) as HTMLDivElement;
    overview.textContent = movieDetails.overview;

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
      ".item-filled-star"
    ) as HTMLImageElement;
    starImg.src = starFilledImg;

    const score = movieItemModal.querySelector(
      ".modal-item-score"
    ) as HTMLSpanElement;
    score.textContent = String(movieDetails.vote_average.toFixed(1));
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
    modalCloseButton.textContent = "X";

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

    // tagSection
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
      class: "item-filled-star",
    }) as HTMLImageElement;
    const score = createElement("span", {
      class: "modal-item-score skeleton",
    });
    scoreWrapper.appendChild(starImg);
    scoreWrapper.appendChild(score);

    tagSection.appendChild(genresElement);
    tagSection.appendChild(scoreWrapper);

    rightModalContentWrapper.appendChild(tagSection);

    // 줄거리
    const overviewSection = createElement("section", {
      class: "modal-movie-overview-wrapper",
    });

    const overview = createElement("div", {
      class: "modal-movie-overview",
    });
    overviewSection.appendChild(overview);

    rightModalContentWrapper.appendChild(overviewSection);

    // myscore
    // TODO: 별추가
    const myscoreSection = createElement("section", {
      class: "my-score-section",
    });
    rightModalContentWrapper.appendChild(myscoreSection);

    const myscore = createElement("div", {
      class: "my-score",
    });
    myscoreSection.appendChild(myscore);

    const myscoreButtonDescription = createElement("label", {
      class: "myscore-button-description",
    });

    // 버튼 추가 어떻게 하지
    // 버튼 엘리먼트를 별도 파일로 만들고 5개 가져오자 ㅎㅎ...
    // 여기서는 가져오고 붙이는 것만
    const myscoreDescription = createElement("label", {
      class: "myscore-description",
    });

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
