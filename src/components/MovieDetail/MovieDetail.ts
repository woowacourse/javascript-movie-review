import Component from "../common/Component";
import Modal from "../Modal/Modal";
import MovieRatingPanel from "../MovieRatingPanel/MovieRatingPanel";

import movieFetcher from "../../http/MovieFetcher";
import { MovieDetailItem } from "../../types/movies";

import { $ } from "../../utils/dom";
import { filledStarLogo } from "../../assets/image";

import "./MovieDetail.css";

export default class MovieDetail extends Component {
  private $modal: Modal | undefined;

  protected initializeState() {
    const $app = $<HTMLDivElement>("#app");

    if (!$app) return;

    this.$modal = new Modal($app);
  }

  protected setEvent() {
    const $button = $<HTMLButtonElement>("#modal-cancel-button");

    $button?.addEventListener("click", () => {
      this.$modal?.hideModal();
    });
  }

  private createDetailTemplate = ({ title, imagePath, genres, overview, voteAverage }: MovieDetailItem) => {
    return /*html*/ `
      <div class="detail-header flex justify-center align-center full-width">
        <div class="h-6 w-4_5 relative flex justify-center align-center">
          <p class="detail-title detail-text-white font-semibold">${title}</p>
          <button id="modal-cancel-button" class="modal-cancel-button detail-text-white absolute right-0">X</button>
        </div>
      </div>
      <div class="detail-body flex">
        <img
          class="detail-thumbnail rounded-lg"
          src="https://image.tmdb.org/t/p/w220_and_h330_face/${imagePath}"
          alt="${imagePath}"
        />
        <div id="detail-description" class="pl-8 flex flex-col justify-between">
          <div class="detail-text-white text-base font-normal">
            <p class="flex align-center mb-1">
            ${genres.join(", ")} <img src="${filledStarLogo}" class="ml-1" alt="별점" /> ${voteAverage.toFixed(1)} 
            </p>
            <p>${overview}</p>
          </div>
        </div>
      </div>  
    `;
  };

  private renderDetail(id: number, data: MovieDetailItem) {
    this.$target.innerHTML = this.createDetailTemplate(data);

    const $div = $<HTMLDivElement>("#detail-description", this.$target);
    if (!$div) return;

    new MovieRatingPanel($div, { id: Number(id) });

    this.$modal?.showModal(this.$target);
  }

  public async handleRenderDetail(id: string): Promise<void> {
    const data = await movieFetcher.getMovieDetail(id);
    if (!data) return;

    this.renderDetail(Number(id), data);
    this.setEvent();
  }
}
