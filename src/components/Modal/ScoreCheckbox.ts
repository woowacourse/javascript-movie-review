import { STAR_FILLED, STAR_LINED } from '../../images';
import { MovieScore, MovieType } from '../../types/movie';
import DOM from '../../utils/DOM';
import { dispatchCustomEvent } from '../../utils/customEvent';

const { $, $$ } = DOM;

const MOIVE_SCORE: Record<string, string> = {
  '2': '2 최악이예요',
  '4': '4 별로예요',
  '6': '6 보통이에요',
  '8': '8 재미있어요',
  '10': '10 명작이에요',
};

const movieScoreManager = {
  render(modal: HTMLDivElement, movie: MovieType) {
    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score-container');

    const scoreCheckbox = Object.keys(MOIVE_SCORE)
      .map(
        (score) => /* html */ `
    <input type="checkbox" id="star${score}" name="score" value="${score}">
    <label for="star${score}"><img src="${STAR_LINED}" alt="별점"></label>`,
      )
      .join('');

    scoreContainer.innerHTML = /* html */ `
        <h3 class="movie-text">내 별점</h3>
        <div class="score-box">
          ${scoreCheckbox}
        </div>
        <h4 class="movie-text">0 점수를 매겨주세요</h4>
    `;

    $('.modal-details', modal)?.appendChild(scoreContainer);

    this.handleStarCheckbox(scoreContainer, movie);
    return scoreContainer;
  },

  handleStarCheckbox(scoreContainer: HTMLDivElement, movie: MovieType) {
    const checkboxes = $$('.score-box input', scoreContainer);

    checkboxes.forEach((checkbox) => {
      checkbox?.addEventListener('click', (e) => {
        const element = e.target as HTMLInputElement;

        this.updateMovieScoreUI(element.value);

        dispatchCustomEvent<MovieScore>('selectMovieScore', { movie, score: element.value });
      });
    });
  },

  updateMovieScoreUI(score: string) {
    const starIcons = $$('.score-box img');
    starIcons.forEach((icon) => {
      const image = icon as HTMLImageElement;
      const checkboxId = icon.parentElement?.getAttribute('for');
      const starIndex = Number(checkboxId!.replace(/^\D+/g, ''));
      image.src = starIndex <= Number(score) ? STAR_FILLED : STAR_LINED;
    });

    const scoreMessage = $('.score-container .movie-text:last-child');
    scoreMessage!.textContent = MOIVE_SCORE[score];
  },
};

export default movieScoreManager;
