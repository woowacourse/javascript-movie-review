import { STAR_FILLED, STAR_LINED } from '../../images';
import { MovieType } from '../../types/movie';
import DOM from '../../utils/DOM';

const { $, $$ } = DOM;

export interface MovieScoreEvent extends CustomEvent {
  detail: {
    movie: MovieType;
    score: string;
  };
}

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

    scoreContainer.innerHTML = /* html */ `
        <h3 class="movie-text">내 별점</h3>
        <div class="score-box">
          ${Object.keys(MOIVE_SCORE)
            .map(
              (score) => /* html */ `
            <input type="checkbox" id="star${score}" name="score" value="${score}">
            <label for="star${score}"><img src="${STAR_LINED}" alt="별점"></label>`,
            )
            .join('')}
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

        const selectMovieScore = new CustomEvent('selectMovieScore', {
          detail: {
            movie,
            score: element.value,
          },
        });
        document.dispatchEvent(selectMovieScore);
      });
    });
  },

  updateMovieScoreUI(score: string) {
    const starIcons = $$('.score-box img');
    const scoreMessage = $('.score-container .movie-text:last-child');
    scoreMessage!.textContent = MOIVE_SCORE[score];

    starIcons.forEach((icon, index) => {
      const image = icon as HTMLImageElement;
      if (index + 1 <= Number(score) / 2) {
        image.src = STAR_FILLED;
      } else {
        image.src = STAR_LINED;
      }
    });
  },
};

export default movieScoreManager;
