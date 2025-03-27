import { MovieDetail } from "../../../../types/movie";
import Date from "../../../../utils/Date";
import MyRate from "./MyRate";
class MovieDetailModalContent {
  #myRate;

  constructor(private parentElement: HTMLElement, private detail: MovieDetail) {
    this.#myRate = new MyRate(this.detail.id);

    this.#initialRender();
    this.#attachMyRateEvents();
  }

  #initialRender(): void {
    this.parentElement.innerHTML = `
      ${this.#imageSection}
      ${this.#descriptionSection}
    `;
  }

  #imageSection(): string {
    const imageUrl = this.detail.poster_path
      ? "https://image.tmdb.org/t/p/original" + this.detail.poster_path
      : "./images/null_image.png";
    return `
      <div class="modal-image">
        <img src="${imageUrl}" alt="${this.detail.title}"/>
      </div>
    `;
  }

  #descriptionSection(): string {
    return `
      <div class="modal-description">
        ${this.#mainInfoSection()}
        ${this.#myRate.ui}
        ${this.#overviewSection()}
      </div>
    `;
  }

  #mainInfoSection(): string {
    const releaseYear = new Date(this.detail.release_date).year;
    const genres = this.detail.genres.map((g) => g.name).join(", ") || "";
    return /*html*/ `
      <h2>${this.detail.title}</h2>
      <div class="modal-description--yearCategory">
        <span>${releaseYear}</span>
        <span>•</span>
        <p class="category">${genres}</p>
      </div>
      <p class="rate">
        <span>평균</span>
        <img src="./images/star_filled.png" class="star" alt="Star"/>
        <span>${this.detail.vote_average.toString()}</span>
      </p>
    `;
  }

  #overviewSection(): string {
    if (!this.detail.overview) return "";
    return `
      <div class="divider"></div>
      <div class="modal-section detail">
        <h3>줄거리</h3>
        <p>${this.detail.overview}</p>
      </div>
    `;
  }

  #attachMyRateEvents(): void {
    this.#myRate.attachEvents();
  }
}

export default MovieDetailModalContent;
