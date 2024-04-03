import Component from "../common/Component";

import MovieRating from "../../domains/MovieRating/MovieRating";
import { Rating } from "../../domains/MovieRating/MovieRating.type";

import { $ } from "../../utils/dom";
import { isArrayElement } from "../../utils/type";
import { Optional } from "../../types/utility";
import { filledStarLogo, emptyStarLogo } from "../../assets/image";

import "./MovieRatingPanel.css";

interface MovieRatingPanelProps {
  id: number;
}

export default class MovieRatingPanel extends Component<MovieRatingPanelProps, {}> {
  private rating: Optional<MovieRating>;

  private static readonly MOVIE_RATING_MESSAGES = {
    0: "평가 없음",
    2: "최악이에요",
    4: "별로에요",
    6: "보통이에요",
    8: "재미있어요",
    10: "명작이에요",
  };

  private static readonly RATING_VALUES = Object.keys(MovieRatingPanel.MOVIE_RATING_MESSAGES).map(Number);

  private static readonly RATING_PER_STAR = 2;

  protected getTemplate() {
    return /*html*/ `
      <div class="full-width flex align-center rounded-2xl rate-container">
        <div class="h-9 ml-1 detail-text-white flex justify-center align-center gap-y-3">
          <p class="text-base font-semibold">내 별점</p>
          <div class="star-container" id="star-logo-container">
            <img src="" value="1" class="h-8 w-8 star-logo" alt="별점 이미지" />
            <img src="" value="2" class="h-8 w-8 star-logo" alt="별점 이미지" />
            <img src="" value="3" class="h-8 w-8 star-logo" alt="별점 이미지" />
            <img src="" value="4" class="h-8 w-8 star-logo" alt="별점 이미지" />
            <img src="" value="5" class="h-8 w-8 star-logo" alt="별점 이미지" />
          </div>
          <p class="text-base font-normal" id="rating-number"></p>
          <p class="text-base font-normal rating-message" id="rating-message"></p>
        </div>
      </div>`;
  }

  protected initializeState() {
    this.rating = new MovieRating();
  }

  protected render() {
    this.$target.insertAdjacentHTML("beforeend", this.getTemplate());
    if (!this.props || !this.rating) return;

    const rating = this.rating.getRatingById(this.props.id);

    this.updateMovieRatingContent(rating);
  }

  protected setEvent() {
    $<HTMLDivElement>("#star-logo-container", this.$target)?.addEventListener("click", (event: MouseEvent) => {
      if (!(event.target instanceof HTMLImageElement)) return;

      const rating = Number(event.target.getAttribute("value")) * MovieRatingPanel.RATING_PER_STAR;

      if (!isArrayElement<number, Rating>(MovieRatingPanel.RATING_VALUES, rating)) return;

      this.handleUpdateMovieRating(rating);
    });
  }

  private handleUpdateMovieRating(rating: Rating) {
    if (!this.props) return;

    this.rating?.updateMovieRating(this.props.id, rating);

    this.updateMovieRatingContent(rating);
  }

  private updateMovieRatingContent(rating: Rating) {
    this.updateRatingStars(rating);

    this.updateRatingNumber(rating);

    this.updateRatingMessage(rating);
  }

  private updateRatingStars(rating: Rating) {
    const $div = $<HTMLDivElement>("#star-logo-container", this.$target);
    if (!$div) return;

    const starLogos = this.$target.querySelectorAll(".star-logo");
    const filledStarCount = rating / MovieRatingPanel.RATING_PER_STAR;

    starLogos.forEach((img, index) => {
      if (!(img instanceof HTMLImageElement)) return;

      img.src = index < filledStarCount ? filledStarLogo : emptyStarLogo;
    });
  }

  private updateRatingNumber(rating: Rating) {
    const $p = $<HTMLParagraphElement>("#rating-number", this.$target);
    if (!$p) return;

    $p.innerText = String(rating);
  }

  private updateRatingMessage(rating: Rating) {
    const $p = $<HTMLParagraphElement>("#rating-message", this.$target);
    if (!$p) return;

    $p.innerText = MovieRatingPanel.MOVIE_RATING_MESSAGES[rating];
  }
}
