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
    this.#container.innerHTML = `
   <div class="movie__detail-container">
    <div class="movie__detail-image">
      <img src=${this.#data.imgUrl} />
    </div>
    <div class="movie__detail-description">
      <h2>${this.#data.title}</h2>
      <p class="category">${this.#data.releasedDate} · ${this.#data.category}</p>
      <p class="rate"><img src="./star_filled.png" class="star" /><span>${this.#data.score}</span></p>
      <hr />
      <p class="detail">
      ${this.#data.description.length !== 0 ? this.#data.description : '줄거리가 없습니다'}
      </p>
    </div>
  </div>
     `;
  }
}
