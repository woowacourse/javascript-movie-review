export default class Modal {
  #movieCard: any;

  constructor(movieCard: any) {
    this.#movieCard = movieCard;

    this.#movieCard.addEventListener('click', this.openModal.bind(this));
  }

  // eslint-disable-next-line max-lines-per-function
  generateModal() {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal', 'modal-open');

    const modalHTML = /* html */ `
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h3 class="detail-title text-detail-title">쿵푸팬더 4</h3>
        <button class="modal-close-button modal--close"></button>
      </div>
      <div class="modal-body">
        <img src="https://dx35vtwkllhj9.cloudfront.net/universalstudios/kung-fu-panda-4/images/regions/us/onesheet.jpg" alt="포스터 이미지" class="detail-poster" />
        <div class="modal-contents">
          <div class="detail-text-container">
            <div class="detail-text-top">
              <p class="detail-genres text-detail-contents">액션, 모험, 애니메이션, 코미디,가족</p>
              <p class="detail-vote_average text-detail-contents">7.011</p>
            </div>
            <p class="detail-overview text-detail-contents">
              마침내 내면의 평화… 냉면의 평화…가 찾아왔다고 믿는 용의 전사 ‘포’ 이젠 평화의 계곡의 영적 지도자가
              되고, 자신을 대신할 후계자를 찾아야만 한다. “이제 용의 전사는 그만둬야 해요?” 용의 전사로의 모습이
              익숙해지고 새로운 성장을 하기보다 지금 이대로가 좋은 ‘포’ 하지만 모든 쿵푸 마스터들의 능력을 그대로
              복제하는 강력한 빌런 ‘카멜레온’이 나타나고 그녀를 막기 위해 정체를 알 수 없는 쿵푸 고수 ‘젠’과 함께
              모험을 떠나게 되는데… 포는 가장 강력한 빌런과 자기 자신마저 뛰어넘고 진정한 변화를 할 수 있을까?
            </p>
          </div>
          <div class="my-vote">
            <p class="my-vote-title text-detail-vote">내 별점</p>
            <div class="my-vote-body">
              <button><img src="./images/star_filled.png"/></button>
              <button><img src="./images/star_filled.png"/></button>
              <button><img src="./images/star_filled.png"/></button>
              <button><img src="./images/star_empty.png"/></button>
              <button><img src="./images/star_empty.png"/></button>
            </div>
            <p class="my-vote-number text-detail-vote-contents">6</p>
            <p class="my-vote-description text-detail-vote-contents">보통이에요</p>
          </div>
        </div>
      </div>
    </div>
   `;

    modalElement.innerHTML = modalHTML;

    document.body.appendChild(modalElement);
  }

  openModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.add('modal--open');
    }

    this.generateModal();
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.remove('modal--open');
    }
  }
}
