import { $, createElement } from "../utils/dom";

type ModalProps = {
  item: {
    id: number;
    title: string;
    rating: number;
    imageSrc: string | null;
    description?: string;
  };
};

const Modal = ({ item }: ModalProps) => {
  const { title, description } = item;

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

  $modalBackground.addEventListener("click", handleClickBackDrop);
  document.addEventListener("keydown", handleKeyDownESC);

  $modal.innerHTML = `
        <button class="close-modal" id="closeModal">
          <img src="images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="${item.imageSrc ? `https://image.tmdb.org/t/p/w500${item.imageSrc}` : "images/nullImage.png"}" alt="${title}"
            />
          </div>
          <div class="modal-description">
          <div class="modal-header">
          ${title ? `<h2>${title}</h2>` : "인사이드 아웃 2"}
            <p class="category">
              2024 · 모험, 애니메이션, 코미디, 드라마, 가족
            </p>
            <div class="rate-container">
              <span class="average">평균</span>
              <img src="images/star_filled.png" class="star" /><span>7.7</span>
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
    description
      ? `<p class="detail">${description}</p>`
      : `<p class="detail">
              13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정 컨트롤
              본부를 운영하는 ‘기쁨’, ‘슬픔’, ‘버럭’, ‘까칠’, ‘소심’. 그러던
              어느 날, 낯선 감정인 ‘불안’, ‘당황’, ‘따분’, ‘부럽’이가 본부에
              등장하고, 언제나 최악의 상황을 대비하며 제멋대로인 ‘불안’이와 기존
              감정들은 계속 충돌한다. 결국 새로운 감정들에 의해 본부에서
              쫓겨나게 된 기존 감정들은 다시 본부로 돌아가기 위해 위험천만한
              모험을 시작하는데…
            </p>`
  }
          </div>
        </div>
`;

  const closeButton = $modal.querySelector(".close-modal");

  closeButton?.addEventListener("click", handleClickClose);
  $modal.addEventListener("click", handleClickBackDrop);

  return $modal;
};

export default Modal;
