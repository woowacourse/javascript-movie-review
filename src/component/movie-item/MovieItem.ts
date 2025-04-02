import { MovieData } from '../../../types/movie';
interface MovieItemProps {
  data: MovieData;
}

class MovieItem {
  #container: HTMLElement;
  #data: MovieData;

  constructor({ data }: MovieItemProps) {
    this.#container = document.createElement('li');
    this.#data = data;
    this.render();
    this.#bindEvents();
  }

  #matchImgUrl() {
    if (this.#data.imgUrl.includes('null')) {
      return 'https://h0ngju.github.io/javascript-movie-review/empty-item.png';
    }
    return this.#data.imgUrl;
  }

  render() {
    this.#container.innerHTML = `
      <div class="item">
        <img class="thumbnail" src=${this.#matchImgUrl()} alt=${this.#data.title}/>
        <div class="item-desc">
          <p class="rate">
            <img src="https://h0ngju.github.io/javascript-movie-review/star_empty.png" class="star" />
            <span>${this.#data.score}</span>
          </p>
          <strong class = 'text-body'>${this.#data.title}</strong>
        </div>
      </div>`;
  }

  #bindEvents = () => {
    this.#container.addEventListener('click', () => {
      const event = new CustomEvent('movie-clicked', {
        detail: this.#data,
        bubbles: true,
      });
      this.#container.dispatchEvent(event);
    });
  };

  get element() {
    // @TODO
    return this.#container;
  }
}

export default MovieItem;
