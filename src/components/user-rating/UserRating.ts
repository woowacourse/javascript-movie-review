import { restoreRating, onClickStar, starIcons } from "./userRatingHandler";

const RATING_DESCRIPTION = ["평가하기", "최악이예요", "별로예요", "보통이에요", "재미있어요", "명작이에요"]
export default class UserRating extends HTMLElement {

  private movieId = "";
  private rating: number = 0;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['movie-id'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const ratingBackUp = restoreRating(newValue);
    this.setMovieId(newValue);
    this.setRating(ratingBackUp ? Number(ratingBackUp) : 0);
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="d-flex justify-content-center user-rating align-items-center p-3">
        <div>내 별점</div>
        <div class="mx-2">${starIcons(this.rating)}</div>
        <div id="rating-point">${this.rating * 2}</div>
        <div class="rating-description mx-1">${RATING_DESCRIPTION[this.rating]}</div>
      </div>
    `;

    onClickStar();
  }

  setRating(newRating: number) {
    this.rating = newRating;
  }

  getRating() {
    return this.rating;
  }

  setMovieId(newMovieId: string) {
    this.movieId = newMovieId;
  }

  getMovieId() {
    return this.movieId;
  }

}
