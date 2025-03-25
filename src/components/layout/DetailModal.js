import createElement from "../utils/createElement";

const DetailModal = () => {
  const $modalBackgroundActive = createElement({
    tag: "div",
    classNames: ["modal-background", "active"],
    id: "modalBackground",
  });

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
    src: "https://image.tmdb.org/t/p/original//pmemGuhr450DK8GiTT44mgwWCP7.jpg",
  });
  const $modalDescription = createElement({
    tag: "div",
    classNames: ["modal-description"],
  });
  const $h2 = createElement({
    tag: "h2",
  });
  const $category = createElement({
    tag: "p",
    classNames: ["category"],
  });
  const $rate = createElement({
    tag: "p",
    classNames: ["rate"],
  });
  const $star = createElement({
    tag: "img",
    src: "./images/star_filled.png",
    classNames: ["star"],
  });
  const $span = createElement({
    tag: "span",
  });
  const $hr = createElement({
    tag: "hr",
  });
  const $detail = createElement({
    tag: "p",
    classNames: ["detail"],
  });

  $modalBackgroundActive.appendChild($modal);
  $modal.appendChild($closeModal);
  $closeModal.appendChild($modalCloseButttonImg);
  $modal.appendChild($modalContainer);
  $modalContainer.appendChild($modalImage);
  $modalImage.appendChild($ModalImg);
  $modalContainer.appendChild($modalDescription);
  $modalDescription.appendChild($h2);
  $modalDescription.appendChild($category);
  $modalDescription.appendChild($rate);
  $rate.appendChild($star);
  $rate.appendChild($span);
  $modalDescription.appendChild($hr);
  $modalDescription.appendChild($detail);

  return $modalBackgroundActive;
};

export default DetailModal;

/* <div class="modal-background active" id="modalBackground">
<div class="modal">
  <button class="close-modal" id="closeModal">
    <img src="./images/modal_button_close.png" />
  </button>
  <div class="modal-container">
    <div class="modal-image">
      <img
        src="https://image.tmdb.org/t/p/original//pmemGuhr450DK8GiTT44mgwWCP7.jpg"
      />
    </div>
    <div class="modal-description">
      <h2>인사이드 아웃 2</h2>
      <p class="category">
        2024 · 모험, 애니메이션, 코미디, 드라마, 가족
      </p>
      <p class="rate">
        <img src="./images/star_filled.png" class="star" /><span
          >7.7</span
        >
      </p>
      <hr />
      <p class="detail">
        13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정 컨트롤
        본부를 운영하는 ‘기쁨’, ‘슬픔’, ‘버럭’, ‘까칠’, ‘소심’. 그러던
        어느 날, 낯선 감정인 ‘불안’, ‘당황’, ‘따분’, ‘부럽’이가 본부에
        등장하고, 언제나 최악의 상황을 대비하며 제멋대로인 ‘불안’이와 기존
        감정들은 계속 충돌한다. 결국 새로운 감정들에 의해 본부에서
        쫓겨나게 된 기존 감정들은 다시 본부로 돌아가기 위해 위험천만한
        모험을 시작하는데…
      </p>
    </div>
  </div>
</div>
</div> */
