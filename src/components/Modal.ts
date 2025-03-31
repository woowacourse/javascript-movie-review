import { $, createElement } from "../utils/dom";

type ModalProps = {
  item: {
    id: number;
    title: string;
    rating: number;
    imageSrc: string | null;
    description?: string;
    releaseDate: string
  };
};

const Modal = ({ item }: ModalProps) => {
  const $body = $("body");

  const $modalBackground = createElement("div", {
    class: ["modal-background", "active"],
    id: "modalBackground",
  });

  const $modal = createElement("dialog", {
    class: ["modal"],
  });

  $body?.appendChild($modalBackground);
  $body?.appendChild($modal);

  const closeModal = () => {
    $modal.close();
    $modal.remove();
    $modalBackground.remove();
  };

  const handleClickClose = () => {
    closeModal();
  };

  const handleKeyDownESC = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  const handleClickBackDrop = (event: MouseEvent) => {
    if (event.target === $modal) {
      closeModal();
    }
  };

  const extractYear = (date: string)  => {
    return date.slice(0, 4);
  }

  $modalBackground.addEventListener("click", handleClickBackDrop);
  document.addEventListener("keydown", handleKeyDownESC);

  $modal.innerHTML = `
        <button class="close-modal" id="closeModal">
          <img src="images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="${item.imageSrc ? `https://image.tmdb.org/t/p/w500${item.imageSrc}` : "images/nullImage.png"}" alt="${item.title}"
            />
          </div>
          <div class="modal-description">
          <div class="modal-header">
          ${item.title ? `<h2>${item.title}</h2>` : "인사이드 아웃 2"}
            <p class="category">
              <span>${extractYear(item.releaseDate)}</span> · 모험, 애니메이션, 코미디, 드라마, 가족
            </p>
            <div class="rate-container">
              <span class="average">평균</span>
              <img src="images/star_filled.png" class="star" /><span>${item.rating}</span>
            </div>
          </div>
          <hr />
            
            <div class="my-rate-container">
            <h3>내 별점</h3>
            <div class="my-rate-content">
            <div class="star-container">
              <img src="images/star_filled.png" class="star" />
              <img src="images/star_filled.png" class="star" />
              <img src="images/star_filled.png" class="star" />
              <img src="images/star_filled.png" class="star" />
              <img src="images/star_empty.png" class="star" />
            </div>
            <span>명작이에요(8/10)</span>
            </div>
            </div>
            <hr />
            
            <h3>줄거리</h3>
            ${
    item.description
      ? `<p class="detail">${item.description}</p>`
      : `<p class="detail">줄거리 요약이 없습니다.</p>`}
          </div>
        </div>
`;

  const closeButton = $modal.querySelector(".close-modal");

  closeButton?.addEventListener("click", handleClickClose);
  $modal.addEventListener("click", handleClickBackDrop);

  const $star = $modal.querySelectorAll(".star-container .star");
  $star.forEach((star, index) => {
    star.addEventListener("click", () => {
      const rating = (index + 1) * 2; // 1번째 별:2, 2번째:4, ..., 5번째:10
      $star.forEach((s, i) => {
        s.setAttribute("src", i <= index ? "images/star_filled.png" : "images/star_empty.png");
      });
      let comment = "";
      switch (rating) {
        case 2:
          comment = "최악이예요";
          break;
        case 4:
          comment = "별로예요";
          break;
        case 6:
          comment = "보통이에요";
          break;
        case 8:
          comment = "재미있어요";
          break;
        case 10:
          comment = "명작이에요";
          break;
      }
      const ratingTextSpan = $modal.querySelector(".my-rate-content span");
      if (ratingTextSpan) {
        ratingTextSpan.textContent = `${comment} (${rating}/10)`;
      }
    });
  });

  return $modal;
};

export default Modal;
