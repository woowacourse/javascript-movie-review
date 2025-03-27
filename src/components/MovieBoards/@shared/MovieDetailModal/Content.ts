import { MovieDetail } from "../../../../types/movie";
import Date from "../../../../utils/Date";

interface ContentContract {
  imageSection: string;
  descriptionSection: string;
}

class MovieDetailModalContent implements ContentContract {
  constructor(private detail: MovieDetail) {}

  public get imageSection(): string {
    const imageUrl = this.detail.poster_path
      ? "https://image.tmdb.org/t/p/original" + this.detail.poster_path
      : "./images/null_image.png";
    return /*html*/ `
        <div class="modal-image">
          <img src="${imageUrl}" alt="${this.detail.title}"/>
        </div>
      `;
  }

  public get descriptionSection(): string {
    return /*html*/ `
        <div class="modal-description">
          ${this.#mainInfoSection()}
          ${this.#myRateSection()}
          ${this.#overviewSection()}
        </div>
      `;
  }

  #myRateSection(): string {
    return /*html*/ `
      <div class="divider"></div>
      <div class="modal-section myRate">
        <h3>별점</h3>
        <!-- TODO -->
      </div>
    `;
  }

  #mainInfoSection(): string {
    const releaseYear = new Date(this.detail.release_date).year;
    const genres =
      this.detail.genres.map((genre) => genre.name).join(", ") || "";

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
    return this.detail.overview
      ? /*html*/ `
          <div class="divider"></div>
          <div class="modal-section detail">
            <h3>줄거리</h3>
            <p>${this.detail.overview}</p>
          </div>
        `
      : "";
  }
}

export default MovieDetailModalContent;
