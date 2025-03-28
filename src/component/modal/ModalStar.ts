import LocalStorage from '../../domain/LocalStorage';

class ModalStar {
  #container;
  #starRating;
  #rate: number;
  #movieId;

  constructor(movieId: number, userRating: ('filled' | 'empty')[] = ['empty', 'empty', 'empty', 'empty', 'empty']) {
    this.#starRating = userRating;
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
      ${this.#starRating
        .map(
          (starRating, index) => `
          <img 
            src="https://h0ngju.github.io/javascript-movie-review/star_${starRating}.png"
            class="modal-star"
            data-index="${index}"
          />`,
        )
        .join('')}
      <div class="text-body review">${this.#updateComent()}</div>
      <div class="text-body">(${this.#rate}/10)</div>
    `;
  }

  #calculateRate() {
    return this.#starRating.filter((star) => star === 'filled').length * 2;
  }

  #bindClickEvent() {
    this.#container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains('modal-star')) throw new Error('별점을 찾을 수 없습니다.');

      const index = Number(target.dataset.index);

      this.#rate = (index + 1) * 2;
      this.#updateState(index + 1);
      LocalStorage.updateMovieStarById(this.#movieId, this.#starRating);
      this.#render();
    });
  }

  #updateState(filledCount: number) {
    this.#starRating = this.#starRating.map((_, i) => (i < filledCount ? 'filled' : 'empty'));
  }

  #updateRate() {
    return (this.#rate = this.#calculateRate());
  }

  #updateComent() {
    if (this.#rate === 0) return '영화 어떻게 보셨나요?';
    if (this.#rate === 2) return '최악이에요';
    if (this.#rate === 4) return '별로에요';
    if (this.#rate === 6) return '보통이에요';
    if (this.#rate === 8) return '재미있어요';
    if (this.#rate === 10) return '명작이에요';
    return '';
  }

  get element() {
    return this.#container;
  }
}

export default ModalStar;
