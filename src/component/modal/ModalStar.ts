import LocalStorage from '../../domain/LocalStorage';
import Rating from '../../domain/Rating';

class ModalStar {
  #container;
  #rating: Rating;
  #movieId;

  constructor(movieId: number) {
    this.#movieId = movieId;
    const savedRating = LocalStorage.getMovieStarById(this.#movieId);
    this.#rating = new Rating(savedRating);
    this.#container = document.createElement('div');
    this.#container.classList.add('modal-star-container');
    this.#render();
    this.#bindClickEvent();
  }

  #render() {
    this.#container.innerHTML = `
      <div class="text-body">내 별점</div>
      ${this.#renderStar()}
      <div class="text-body review">${this.#rating.comment}</div>
      <div class="text-body">(${this.#rating.score}/10)</div>
    `;
  }

  #renderStar() {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const starType = starValue <= this.#rating.userRating ? 'filled' : 'empty';
      return `
        <img 
          src="https://h0ngju.github.io/javascript-movie-review/star_${starType}.png"
          class="modal-star"
          data-value="${starValue}"
        />
      `;
    }).join('');
  }

  #bindClickEvent() {
    this.#container.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement)) {
        throw new Error('이벤트 요소가 HTMLElement가 아닙니다.');
      }
      const target = e.target;
      if (!target.classList.contains('modal-star')) throw new Error('별점을 찾을 수 없습니다.');

      const newRating = Number(e.target.dataset.value);
      this.#rating.update(newRating);
      this.#render();
    });
  }

  get element() {
    return this.#container;
  }

  getUserRating() {
    return this.#rating.userRating;
  }
}

export default ModalStar;
