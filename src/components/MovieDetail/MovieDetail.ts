import Component from "../common/Component";
import Modal from "../Modal/Modal";
import MovieRatingPanel from "../MovieRatingPanel/MovieRatingPanel";

import movieFetcher from "../../http/MovieFetcher";
import { MovieDetailItem } from "../../types/movies";

import { $ } from "../../utils/dom";
import { filledStarLogo } from "../../assets/image";

import "./MovieDetail.css";
import { ERROR_IMAGE_SOURCE } from "../../constants/movie";

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
      <div class="full-width flex justify-center align-center detail-header">
        <div class="h-6 w-4_5 relative flex justify-center align-center detail-title-container">
          <p class="detail-text-white font-semibold detail-title">${title}</p>
          <button id="modal-cancel-button" class="absolute right-0 flex justify-center align-center detail-text-white modal-cancel-button">X</button>
        </div>
      </div>
      <div class="flex detail-body-container detail-body">
        <div>
          <img
          class="rounded-lg bg-contain detail-thumbnail"
          src="https://image.tmdb.org/t/p/w220_and_h330_face/${imagePath}"
          onerror="this.src='${ERROR_IMAGE_SOURCE}'"
          alt="${imagePath}"
          />
        </div>
        <div id="detail-description" class="pl-8 flex flex-col justify-between detail-description">
          <div class="detail-text-white text-base font-normal">
            <p class="mb-1 flex align-center genres-rate">
            ${genres.join(", ") || "장르가 존재하지 않습니다."} <img src="${filledStarLogo}" class="ml-1" alt="별점" /> ${voteAverage.toFixed(1)} 
            </p>
            <p class="detail-overview">${overview || "줄거리가 존재하지 않습니다."}</p>
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
