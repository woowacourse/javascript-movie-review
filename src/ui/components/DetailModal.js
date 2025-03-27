class DetailModal {
  constructor(movie) {
    this.movie = movie;
  }

  render() {
    const modalBackground = document.createElement('div');
    modalBackground.classList.add('modal-background', 'active');
    modalBackground.id = 'modalBackground';

    modalBackground.innerHTML = /*html*/`
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="https://image.tmdb.org/t/p/original//pmemGuhr450DK8GiTT44mgwWCP7.jpg" />
          </div>
          <div class="modal-description">
            <h2>인사이드 아웃 2</h2>
            <p class="category">
              2024 · 모험, 애니메이션, 코미디, 드라마, 가족
            </p>
            <p class="rate">
              <img src="./images/star_filled.png" class="star" /><span>7.7</span>
            </p>
            <hr />
            <p class="detail">
              13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정 컨트롤
              본부를 운영하는 '기쁨', '슬픔', '버럭', '까칠', '소심'. 그러던
              어느 날, 낯선 감정인 '불안', '당황', '따분', '부럽'이가 본부에
              등장하고, 언제나 최악의 상황을 대비하며 제멋대로인 '불안'이와 기존
              감정들은 계속 충돌한다. 결국 새로운 감정들에 의해 본부에서
              쫓겨나게 된 기존 감정들은 다시 본부로 돌아가기 위해 위험천만한
              모험을 시작하는데…
            </p>
          </div>
        </div>
      </div>
    `;

    return modalBackground;
  }  

  addDetailModal(movie) {
    const modal = new DetailModal(movie);
    const modalElement = modal.render();
    document.body.classList.add('modal-open');
    document.body.appendChild(modalElement);
    
    const closeModal = modalElement.querySelector('#closeModal');
    closeModal.addEventListener('click', () => {
      this.removeDetailModal();
    });
  }

  removeDetailModal() {
    const modalBackground = document.querySelector('.modal-background');
    document.body.classList.remove('modal-open');
    modalBackground.remove();
  }
}

export default DetailModal;
