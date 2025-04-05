import { isHTMLElement } from "../../utils/typeGuards";
import MovieApi from "../../api/MovieApi";
import { MovieDetail } from "../../types/movie";
import MyRate from "../MyRate";
// import Skeleton from "../Skeleton";
import { ModalStrategy } from "./Modal";
import Skeleton from "../Skeleton";

class MovieDetailModalStrategy implements ModalStrategy {
  private static readonly IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original";

  renderInitial(parent: HTMLElement): void {
    parent.innerHTML = Skeleton.MovieDetailModal;
  }

  async fetchAndRender(id: number, parent: HTMLElement): Promise<void> {
    const details: MovieDetail = await MovieApi.fetchMovieDetail(id);

    parent.innerHTML = `
       <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="./images/modal_button_close.png" />
      </button>
      <div class="modal-container">
          <div class="modal-image">
            <img src="${this.posterImage(details.poster_path)}" alt="${
      details.title
    }" />
          </div>
          <div class="modal-description">
            <h2>${details.title}</h2>
            <p class="category">${details.genres
              .map((g) => g.name)
              .join(", ")}</p>
            <p class="rate">
              <img src="./images/star_filled.png" class="star" />
              <span>${details.vote_average}</span>
            </p>
            <hr />
            <div class="my-rate"></div>
            <hr />
            <p class="detail">${details.overview}</p>
          </div>
        </div>
      
        
      `;

    const $stars = document.querySelector(".my-rate");
    if (isHTMLElement($stars)) new MyRate($stars, id);
  }

  private posterImage(path: string | null): string {
    return path
      ? `${MovieDetailModalStrategy.IMAGE_BASE_URL}${path}`
      : "./images/null_image.png";
  }
}

export default MovieDetailModalStrategy;
