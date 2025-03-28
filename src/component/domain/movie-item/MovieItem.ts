import { MovieData } from '../../../../types/movie';

interface MovieItemProps {
  data: MovieData;
}

class MovieItem {
  #container: HTMLElement;
  #data: MovieData;

  constructor({ data }: MovieItemProps) {
    this.#container = document.createElement('li');
    this.#container.classList.add('item');
    this.#data = data;

    this.render();
    this.#bindClickEvent();
  }

  #matchImgUrl() {
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

  get element() {
    return this.#container;
  }
}

export default MovieItem;
