import BaseModal from "./BaseModal";
import MovieState from "../../states/MovieState";

import {
  generateEmptyMovieListScreen,
  generateNetworkNotWorkingScreen,
} from "../templates/generateUnexpectedScreen";
import { generateStarRating } from "../templates/generateStarRating";
import { generateMovieDetailModal } from "../templates/generateMovieDetailModal";

import APIError from "../../error/APIError";
import { getMovieDetail } from "../../apis/movieList";

import { $ } from "../../utils/dom";
import { storage } from "../../utils/storage";

import { MovieDetail } from "../../types/movies";
import { HTMLTemplate, TargetId } from "../../types/common";

interface MovieDetailModalProps {
  targetId: TargetId;
  movieState: MovieState;
}

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
    const starRating = storage.get<Record<number, number>>("starRating") ?? {};
    const rating = starRating[this.movieState.get() as number] ?? 0;

    return generateMovieDetailModal(this.movieDetail, rating);
  }

  protected setEvent(): void {
    super.setEvent();

    const $closeButton = $<HTMLElement>("close-button");
    const $starRatingContainer = $<HTMLElement>("star-rating-container");

    $closeButton?.addEventListener("click", this.closeModal.bind(this));
    $starRatingContainer?.addEventListener(
      "click",
      this.onStarRatingClick.bind(this)
    );
  }

  private onStarRatingClick(event: Event): void {
    const target = event.target as HTMLElement;
    const starRatingIndex = target.dataset.index;

    if (starRatingIndex) {
      const rating = Number(starRatingIndex);
      this.updateStarRating(this.movieState.get() as number, rating);
    }
  }

  private updateStarRating(movieId: number, rating: number): void {
    const starRating = storage.get<Record<number, number>>("starRating") ?? {};
    starRating[movieId] = rating;

    storage.set("starRating", starRating);
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
