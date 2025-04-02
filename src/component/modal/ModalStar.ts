import LocalStorage from '../../domain/LocalStorage';

class ModalStar {
  #container;
  #userRating: number;
  #rate: number;
  #movieId;

  constructor(movieId: number, userRating: number | 0) {
    this.#userRating = userRating;
    this.#movieId = movieId;
    this.#rate = this.#updateRate();
    this.#container = document.createElement('div');
    this.#container.classList.add('modal-star-container');
    this.#render();
    this.#bindClickEvent();
  }

  #render() {
    this.#container.innerHTML = `
      <div class="text-body">내 별점</div>
      ${this.#renderStar()}
      <div class="text-body review">${this.#updateComent()}</div>
      <div class="text-body">(${this.#rate}/10)</div>
    `;
  }

  #renderStar() {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const starType = starValue <= this.#userRating ? 'filled' : 'empty';
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

      this.#userRating = Number(target.dataset.value);
      this.#rate = this.#updateRate();

      LocalStorage.updateMovieStarById(this.#movieId, this.#userRating);
      this.#render();
    });
  }

  #updateRate() {
    return (this.#rate = this.#userRating * 2);
  }

  #updateComent() {
    const COMMENT: Record<number, string> = {
      0: '영화 어떻게 보셨나요?',
      2: '최악이에요',
      4: '별로에요',
      6: '보통이에요',
      8: '재미있어요',
      10: '명작이에요',
    };

    return COMMENT[this.#rate] || '';
  }

  get element() {
    return this.#container;
  }
}

export default ModalStar;
