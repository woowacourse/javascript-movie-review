import { MovieData } from '../../../../types/movie';
import { movieItemSkeletonTemplate } from './movieItemSkeletonTemplate';

class MovieItem {
  #container: HTMLElement;
  #data: MovieData | null = null;

  constructor() {
    this.#container = document.createElement('li');
    this.#container.classList.add('item');
    this.#data = null;

    this.render();
    this.#bindClickEvent();
  }

  get element() {
    return this.#container;
  }

  hasData() {
    return this.#data !== null;
  }

  #matchImgUrl() {
    if (!this.#data) return;

    if (this.#data.imgUrl.includes('null')) {
      return './empty-item.png';
    }
    return this.#data.imgUrl;
  }

  #bindClickEvent() {
    this.#container.addEventListener('click', () => {
      const event = new CustomEvent('movieSelect', {
        detail: this.#data,
        bubbles: true,
      });

      this.#container.dispatchEvent(event);
    });
  }

  render() {
    this.#container.innerHTML = '';

    if (!this.#data) {
      this.#container.innerHTML = `${movieItemSkeletonTemplate}`;
      return;
    }
    this.#container.innerHTML = `
      <img class="thumbnail" src=${this.#matchImgUrl()} alt=${this.#data.title} />
      <div class="item-desc">
        <p class="rate">
          <img src="./star_empty.png" class="star" />
          <span>${this.#data.score}</span>
        </p>
        <strong class="text-body">${this.#data.title}</strong>
      </div>
  `;
  }

  setData(data: MovieData | null) {
    this.#data = data;
    this.render();
  }
}

export default MovieItem;
