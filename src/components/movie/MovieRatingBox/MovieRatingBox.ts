import Component from '../../common/Component/Component';
import RatingService from '../../../domain/Rating/RatingService';
import { querySelector, querySelectorAll } from '../../../utils/dom/selector';
import { FilledStar, EmptyStar } from '../../../assets';
import './MovieRatingBox.css';

interface MovieRatingBoxProps {
  key: number;
}

const RATING_TEXT: Record<number, string> = {
  0: '점수가 없어요',
  2: '최악이에요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

class MovieRatingBox extends Component<MovieRatingBoxProps> {
  private score: number | undefined;

  protected render(): void {
    this.$element.innerHTML = this.createComponent();
  }

  protected initializeState(): void {
    this.initializeRatingScore();
  }

  private initializeRatingScore() {
    if (this.props) {
      this.score = RatingService.getRatingScore(this.props.key);
    }

    this.render();
  }

  protected createComponent(): string {
    return /* html */ `
      <h3>내 별점</h3>
      <form id="movie-rating-form" class="flex items-center">
        ${Array.from({ length: 5 })
          .map((_, index) => this.createEmptyStar(index + 1, this.score))
          .join('')}
      </form>
      <p id="movie-rating-text">${this.createRatingText(this.score)}</p>
    `;
  }

  private createEmptyStar(index: number, score: number = 0) {
    return `
      <label for="star-${index}">
        <input id="star-${index}" type="radio" value="${index * 2}" class="movie-rating-input">
        <img src="${index * 2 <= score ? FilledStar : EmptyStar}" alt="별" class="movie-rating-image" />
      </label>
    `;
  }

  private createRatingText(score: number = 0) {
    return `${score}점 <span class="movie-rating-text">${RATING_TEXT[score]}</span>`;
  }

  protected setEvent(): void {
    const $movieRatingForm = querySelector('#movie-rating-form', this.$element);
    $movieRatingForm.addEventListener('change', this.updateRating.bind(this));
  }

  private updateStarImages(score: number) {
    const $starImages = querySelectorAll<HTMLImageElement>('.movie-rating-image', this.$element);

    $starImages.forEach(($star, index) => {
      $star.src = (index + 1) * 2 <= score ? FilledStar : EmptyStar;
    });
  }

  private updateRatingText(score: number) {
    const $movieRatingText = querySelector<HTMLParagraphElement>('#movie-rating-text', this.$element);

    $movieRatingText.innerHTML = this.createRatingText(score);
  }

  private updateRating(event: Event) {
    const $movieRatingInputs = querySelectorAll<HTMLInputElement>('.movie-rating-input', this.$element);
    const score = Number((event.target as HTMLInputElement).value);

    $movieRatingInputs.forEach(($input) => {
      if ($input !== event.target) {
        $input.checked = false;
      }
    });

    this.updateStarImages(score);
    this.updateRatingText(score);

    if (this.props) {
      RatingService.updateRating({ key: this.props.key, score: score });
    }
  }
}

export default MovieRatingBox;
