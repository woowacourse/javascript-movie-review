import { MovieData } from '../../../../types/movie';

interface MovieDetailOptions {
  data: MovieData;
}

export class MovieDetail {
  #container;
  #data: MovieData;

  constructor({ data }: MovieDetailOptions) {
    this.#container = document.createElement('div');
    this.#container.classList.add('movie-detail-container');

    this.#data = data;

    this.render();
  }

  get element() {
    return this.#container;
  }

  render() {
    //@TODO : 몇 년도 영화인지 넣을 것
    this.#container.innerHTML = `
   <div class="movie__detail-container">
    <div class="movie__detail-image">
      <img src=${this.#data.imgUrl} />
    </div>
    <div class="movie__detail-description">
      <h2>${this.#data.title}</h2>
      <p class="category">${this.#data.category}</p>
      <p class="rate"><img src="./star_filled.png" class="star" /><span>${this.#data.score}</span></p>
      <hr />
      <p class="detail">
      ${this.#data.description}
      </p>
    </div>
  </div>
     `;
  }
}
