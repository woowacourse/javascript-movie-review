import { MovieDetail } from "../../../types/MovieType";
import imageUrl from "../../../utils/imageUrl";
import createElement from "../../utils/createElement";
import { getGenres, getYear } from "../../../utils/parsingData";
import "/styles/modal.css";

class Modal {
  modalElement: HTMLDialogElement;
  closeButton: HTMLButtonElement;
  movieId: number;

  constructor(movieDetail: MovieDetail, id: number) {
    this.movieId = id;
    this.modalElement = document.getElementById(
      "modalBackground"
    ) as HTMLDialogElement;

    this.render(movieDetail);
    this.closeButton = document.getElementById(
      "closeModal"
    ) as HTMLButtonElement;

    this.open();
    this.addEventListeners();
  }

  open() {
    this.modalElement.showModal();
    document.body.classList.add("modal-open");
  }

  close() {
    this.modalElement.close();
    document.body.classList.remove("modal-open");
  }

  addEventListeners() {
    this.closeButton.addEventListener("click", () => this.close());

    this.modalElement.addEventListener("click", (e: MouseEvent) => {
      if (e.target === this.modalElement) {
        this.close();
      }
    });
  }

  render({
    title,
    release_date,
    genres,
    vote_average,
    overview,
    poster_path,
  }: MovieDetail) {
    const $modal = createElement({
      tag: "div",
      classNames: ["modal"],
    });

    const $closeModal = createElement({
      tag: "button",
      classNames: ["close-modal"],
      id: "closeModal",
    });

    const $modalCloseButttonImg = createElement({
      tag: "img",
      src: "./images/modal_button_close.png",
    });

    const $modalContainer = createElement({
      tag: "div",
      classNames: ["modal-container"],
    });

    const $modalImage = createElement({
      tag: "div",
      classNames: ["modal-image"],
    });

    const $ModalImg = createElement({
      tag: "img",
      src: imageUrl(poster_path),
    });

    const $modalDescription = createElement({
      tag: "div",
      classNames: ["modal-description"],
    });

    const $h2 = createElement({
      tag: "h1",
      id: "modalTitle",
    });
    $h2.textContent = title;

    const $category = createElement({
      tag: "p",
      classNames: ["category"],
    });
    $category.textContent = `${getYear(release_date)} · ${getGenres(genres)}`;

    const $averageRate = createElement({
      tag: "p",
      classNames: ["rate"],
    });

    const $labelspan = createElement({
      tag: "span",
    });
    $labelspan.textContent = "평균";

    const $starFilled = createElement({
      tag: "img",
      src: "./images/star_filled.png",
      classNames: ["star"],
    });

    const $rateScore = createElement({
      tag: "span",
      classNames: ["rate-score"],
    });
    $rateScore.textContent = `${vote_average}`;

    const $rateBox = createElement({
      tag: "div",
      classNames: ["rate-box"],
    });

    const $myStar = createElement({
      tag: "h2",
      classNames: ["my-star"],
    });
    $myStar.textContent = "내 별점";

    const $starCommentBox = createElement({
      tag: "div",
      classNames: ["star-comment-box"],
    });

    const $stars = createElement({
      tag: "div",
      classNames: ["stars"],
    });

    const $comment = createElement({
      tag: "p",
      classNames: ["comment"],
    });
    $comment.textContent = "명작이에요";

    const $score = createElement({
      tag: "span",
      classNames: ["score"],
    });

    const $overviewSpan = createElement({
      tag: "h2",
      classNames: ["overview"],
    });
    $overviewSpan.textContent = "줄거리";

    const $detail = createElement({
      tag: "p",
      classNames: ["detail"],
    });
    $detail.textContent = overview;

    $modal.appendChild($closeModal);
    $closeModal.appendChild($modalCloseButttonImg);
    $modal.appendChild($modalContainer);
    $modalContainer.append($modalImage, $modalDescription);
    $modalImage.appendChild($ModalImg);
    $modalDescription.append(
      $h2,
      $category,
      $averageRate,
      $rateBox,
      $overviewSpan,
      $detail
    );
    $averageRate.append($labelspan, $starFilled, $rateScore);
    $rateBox.append($myStar, $starCommentBox);
    $starCommentBox.append($stars, $comment, $score);

    const renderStars = (rating: number) => {
      $stars.replaceChildren();
      const score = rating * 2;
      $score.textContent = `(${score}/10)`;

      const filledCount = rating;
      const emptyCount = 5 - rating;

      for (let i = 0; i < filledCount; i++) {
        const $countedStar = createElement({
          tag: "img",
          classNames: ["star"],
          src: "./images/star_filled.png",
        });

        $countedStar.addEventListener("click", () => {
          const saved = JSON.parse(localStorage.getItem("myRating")!) ?? {};
          const newState = JSON.stringify({
            ...saved,
            [this.movieId]: String(i + 1),
          });
          localStorage.setItem("myRating", newState);
          console.log(saved);
          console.log(newState);
          renderStars(i + 1);
        });

        $stars.appendChild($countedStar);
      }

      for (let i = 0; i < emptyCount; i++) {
        const $unCountedStar = createElement({
          tag: "img",
          classNames: ["star"],
          src: "./images/star_empty.png",
        });

        $unCountedStar.addEventListener("click", () => {
          const saved = JSON.parse(localStorage.getItem("myRating")!) ?? {};
          const newState = JSON.stringify({
            ...saved,
            [this.movieId]: String(filledCount + i + 1),
          });
          localStorage.setItem("myRating", newState);
          renderStars(filledCount + i + 1);
        });

        $stars.appendChild($unCountedStar);
      }
    };

    this.modalElement.replaceChildren($modal);
    const saved = JSON.parse(localStorage.getItem("myRating")!) ?? {};
    const rateValue = Number(saved[this.movieId]);
    renderStars(rateValue ? rateValue : 4);
  }
}

export default Modal;
