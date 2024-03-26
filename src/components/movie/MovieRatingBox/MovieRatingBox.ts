import Component from '../../common/Component/Component';
import RatingStorage from '../../../store/RatingStorage';
import { querySelector, querySelectorAll } from '../../../utils/dom/selector';
import { FilledStar, EmptyStar } from '../../../assets';

interface MovieRatingBoxProps {
  key: number;
}

class MovieRatingBox extends Component<MovieRatingBoxProps> {
  private score: number | undefined;

  protected render(): void {
    this.$element.innerHTML = this.createComponent();
  }

  protected initializeState(): void {
    this.initializeRating();
    this.reRender();
  }

  private reRender() {
    this.$element.innerHTML = '';
    this.render();
  }

  private initializeRating() {
    if (this.props) {
      this.score = RatingStorage.getRatingScore(this.props.key);
    }
  }

  protected createComponent(): string {
    return /* html */ `
      <h3>내 별점</h3>
      <form id="movie-rating-form" class="flex items-center">
        ${Array.from({ length: 5 })
          .map((_, index) => this.createEmptyStar(index + 1, this.score ?? 0))
          .join('')}
      </form>
      <p id="movie-rating-score">${this.score}</p>
      <p id="movie-rating-text">${this.createRatingText(this.score ?? 0)}</p>
    `;
  }

  private createEmptyStar(key: number, score: number) {
    return `
      <label for="star-${key}">
        <input id="star-${key}" type="radio" value="${key * 2}" class="movie-rating-input">
        <img src="${key * 2 <= score ? FilledStar : EmptyStar}" alt="별" class="movie-rating-image" />
      </label>
    `;
  }

  private createRatingText(rating: number) {
    switch (rating) {
      case 2:
        return '최악이에요';
      case 4:
        return '별로예요';
      case 6:
        return '보통이에요';
      case 8:
        return '재미있어요';
      case 10:
        return '명작이에요';
      default:
        return '점수가 없어요';
    }
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
    const $movieRatingScore = querySelector<HTMLParagraphElement>('#movie-rating-score', this.$element);
    const $movieRatingText = querySelector<HTMLParagraphElement>('#movie-rating-text', this.$element);

    $movieRatingScore.textContent = `${score}`;
    $movieRatingText.textContent = this.createRatingText(score);
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
      RatingStorage.updateRating({ key: this.props.key, score: score });
    }
  }
}

export default MovieRatingBox;
