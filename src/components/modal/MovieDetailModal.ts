import BaseModal from "./BaseModal";
import MovieState from "../../states/MovieState";

import { generateStarRating } from "../templates/generateStarRating";
import { generateMovieDetailModal } from "../templates/generateMovieDetailModal";

import { getMovieDetail } from "../../apis/movieList";
import { handleAPIError } from "../../error/handleAPIError";

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
      handleAPIError(error, this.targetId);
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
    this.updateStarRatingUI(rating);
  }

  private updateStarRatingUI(rating: number): void {
    const $starRatingContainer = $<HTMLElement>("star-rating-container");
    if (!$starRatingContainer) return;
    const newStarRatingHTML = generateStarRating(rating);
    $starRatingContainer.innerHTML = newStarRatingHTML;
  }

  private async fetchMovieDetail(params: number | null) {
    const fetchedData = await getMovieDetail(params);
    return fetchedData;
  }
}
