class DetailModal {
  constructor(movie) {
    this.movie = movie;
    this.userRating = 0;
  }

  render() {
    const modalBackground = document.createElement('div');
    modalBackground.classList.add('modal-background', 'active');
    modalBackground.id = 'modalBackground';

    modalBackground.innerHTML = /*html*/ `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="https://image.tmdb.org/t/p/original${
              this.movie.poster_path
            }" />
          </div>
          <div class="modal-description">
            <h2>${this.movie.title}</h2>
            <p class="category">
              ${this.movie.release_date} · ${this.movie.genres
      .map(genre => genre.name)
      .join(', ')}
            </p>
            
            <p class="rate">
              <span>평균</span><img src="./images/star_filled.png" class="star" /><span>${
                this.movie.vote_average
              }</span>
            </p>  
            
            <hr />
            <p class="my-rate">
              <span>내 별점</span>
              <div class="star-rating">
              <div class="star-rating-item">
                <span class="empty-star" data-rating="1"><img src="./images/star_empty.png" class="star" /></span>
                <span class="empty-star" data-rating="2"><img src="./images/star_empty.png" class="star" /></span>
                <span class="empty-star" data-rating="3"><img src="./images/star_empty.png" class="star" /></span>
                <span class="empty-star" data-rating="4"><img src="./images/star_empty.png" class="star" /></span>
                <span class="empty-star" data-rating="5"><img src="./images/star_empty.png" class="star" /></span>
                </div>
                <div class = "detail-rating">
                <span class="rating-text">이 작품 어땠나요?</span>
                <span class="rating-score">(?/10)</span>
                </div>
              </div>
            </p>


            <hr />
            <div class="movie-overview">
              <h3>줄거리</h3>
              <p class="detail">
                ${this.movie.overview}
              </p>
            </div>

          </div>
        </div>
      </div>
    `;
    this.setupStarRating(modalBackground);

    return modalBackground;
  }

  setupStarRating(modalElement) {
    // 별점 클릭 이벤트 처리
    const stars = modalElement.querySelectorAll('.empty-star');
    const ratingText = modalElement.querySelector('.rating-text');
    const ratingScore = modalElement.querySelector('.rating-score');

    // 별점에 따른 텍스트 매핑
    const ratingTexts = {
      1: '최악이에요',
      2: '별로예요',
      3: '보통이에요',
      4: '재미있어요',
      5: '명작이에요',
    };

    // 별점에 따른 점수 매핑
    const ratingScores = {
      1: '(2/10)',
      2: '(4/10)',
      3: '(6/10)',
      4: '(8/10)',
      5: '(10/10)',
    };

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        this.userRating = rating;

        // 별 표시 업데이트
        stars.forEach((s, index) => {
          if (index < rating) {
            s.innerHTML = '<img src="./images/star_filled.png" class="star" />'; // 채워진 별
            s.classList.remove('empty-star');
            s.classList.add('filled-star');
          } else {
            s.innerHTML = '<img src="./images/star_empty.png" class="star" />'; // 빈 별
            s.classList.remove('filled-star');
            s.classList.add('empty-star');
          }
        });

        // 텍스트와 점수 업데이트
        ratingText.textContent = ratingTexts[rating];
        ratingScore.textContent = ratingScores[rating];
      });
    });
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

    //esc를 누르거나 화면 바깥을 누르면꺼지도록
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.removeDetailModal();
      }
    });

    document.addEventListener('click', e => {
      if (e.target.classList.contains('modal-background')) {
        this.removeDetailModal();
      }
    });
  }

  removeDetailModal() {
    const modalBackground = document.querySelector('.modal-background');
    document.body.classList.remove('modal-open');
    modalBackground.remove();
  }
}

export default DetailModal;
