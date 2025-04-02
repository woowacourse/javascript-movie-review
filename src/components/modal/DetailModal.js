import StarRating from './StarRating.js';

class DetailModal {
  constructor(movie) {
    this.movie = movie;
  }

  render() {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'active');
    modal.id = 'modal';

    modal.innerHTML = /*html*/ `
      <div class="modal-background" id="modalBackground">
        <div class="modal-container">
          <button class="close-modal" id="closeModal">
            <img src="./images/modal_button_close.png" />
          </button>
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
              <div class="star-rating-container"></div>
            </p>

            <hr />
            <div class="movie-overview">
              <span>줄거리</span>
              <p class="detail">
                ${this.movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    // StarRating 컴포넌트 추가
    const starRatingContainer = modal.querySelector(
      '.star-rating-container',
    );
    const starRating = new StarRating(this.movie);
    starRatingContainer.appendChild(starRating.render());

    return modal;
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
    const modal = document.querySelector('.modal');
    document.body.classList.remove('modal-open');
    modal.remove();
  }
}

export default DetailModal;