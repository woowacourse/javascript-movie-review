import BaseModal from "./BaseModal";
import {
  generateEmptyMovieListScreen,
  generateNetworkNotWorkingScreen,
} from "../templates/generateUnexpectedScreen";
import MovieState from "../../states/MovieState";

import APIError from "../../error/APIError";
import { getMovieDetail } from "../../apis/movieList";

import { HTMLTemplate, TargetId } from "../../types/common";
import { $ } from "../../utils/dom";
import { MovieDetail } from "../../types/movies";
import IMAGES from "../../images";

interface MovieDetailModalProps {
  targetId: TargetId;
  movieState: MovieState;
}

// TODO: BASE_POSTER_URL이 generateMovieItems에서도 공통으로 사용됨 → 분리
const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w220_and_h330_face";

export default class MovieDetailModal extends BaseModal {
  private movieState: MovieState;
  private movieDetail: MovieDetail;

  constructor({ targetId, movieState }: MovieDetailModalProps) {
    super({ targetId });
    this.movieState = movieState;
    this.movieDetail = {} as MovieDetail;
  }

  override async init() {
    try {
      this.movieDetail = await this.fetchMovieDetail(this.movieState.get());
      this.render();
      this.setEvent();
    } catch (error) {
      this.handleError(error);
    }
  }

  protected getModalContent(): HTMLTemplate {
    const { genres, overview, poster_path, title, vote_average } =
      this.movieDetail;

    const genreNames = genres.map((genre) => genre.name).join(", ");

    return `
      <div class="modal-content">
          <div class="modal-header">
              <h2 class="modal-title">${title}</h2>
              <button id="close-button" class="close-button">X</button>
          </div>
          <div class="modal-body">
              <div class="modal-image">
                  <img src="${BASE_POSTER_URL}/${poster_path}" alt="${title} thumbnail" />
              </div>
              <div class="modal-info">
                <div>
                  <div class="movie-genre">${genreNames}</div>
                  <div class="movie-rating">
                    <img src="${IMAGES.starFilled}" alt="별점" />
                      ${vote_average}
                    </div>
                  </div>
                  <div class="movie-overview">${overview}</div>
              </div>
          </div>
      </div>
    `;
  }

  protected setEvent(): void {
    super.setEvent();

    const $closeButton = $<HTMLElement>("close-button");
    $closeButton?.addEventListener("click", this.closeModal.bind(this));
  }

  private handleError(error: unknown): void {
    if (error instanceof APIError) {
      this.displayErrorMessage(error.message, generateEmptyMovieListScreen);
    } else if (error instanceof Error) {
      this.displayErrorMessage(
        "네트워크가 원활하지 않습니다. 인터넷 연결 확인 후 다시 시도해주세요.",
        generateNetworkNotWorkingScreen
      );
    }
  }

  private displayErrorMessage(
    message: string,
    screenGenerator: () => HTMLTemplate
  ): void {
    alert(message);
    const errorTargetElement = $<HTMLElement>(this.targetId);
    if (errorTargetElement) {
      errorTargetElement.innerHTML = screenGenerator();
    }
  }

  private async fetchMovieDetail(params: number | null) {
    const fetchedData = await getMovieDetail(params);
    return fetchedData;
  }
}
