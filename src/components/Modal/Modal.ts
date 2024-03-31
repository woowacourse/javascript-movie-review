import './style.css';
import { MovieType } from '../../types/movie';
import DOM from '../../utils/DOM';
import { CLOSE_BUTTON, STAR_FILLED, STAR_LINED } from '../../images';

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

const Modal = {
  render(movie: MovieType) {
    const modal = document.createElement('div');
    modal.setAttribute('id', `${movie.title}`);
    modal.classList.add('modal');

    modal.innerHTML = /* html */ `
    <div class="modal-container">
        <div class="modal-header">
            <h2>${movie.title}</h2>
            <button class="modal-close-btn">
                <img src="${CLOSE_BUTTON}" >
            </button>
        </div>
        <div class="modal-main">
            <div class="modal-poster">
                <img src="https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}" >
            </div>
            <div class="modal-details">
                <div class="movie-info">
                    <h3 class="movie-text">${movie.genre_ids}</h3>
                    <p class="movie-text"><img src=${STAR_FILLED} alt="별점">${movie.vote_average.toFixed(
      1,
    )}</p>
                </div>
                <p class="movie-text summary">${movie.overview}</p>
                <div class="vote-container">
                    <h3 class="movie-text">내 별점</h3>
                    <div class="vote-box">
                        <input type="checkbox" id="star1" name="vote" value="2">
                        <label for="star1"><img src="${STAR_LINED}" alt="별점"></label>
                        <input type="checkbox" id="star2" name="vote" value="4">
                        <label for="star2"><img src="${STAR_LINED}" alt="별점"></label>
                        <input type="checkbox" id="star3" name="vote" value="6">
                        <label for="star3"><img src="${STAR_LINED}" alt="별점"></label>
                        <input type="checkbox" id="star4" name="vote" value="8">
                        <label for="star4"><img src="${STAR_LINED}" alt="별점"></label>
                        <input type="checkbox" id="star5" name="vote" value="10">
                        <label for="star5"><img src="${STAR_LINED}" alt="별점"></label>
                    </div>
                    <h4 class="movie-text">0 점수를 매겨주세요</h4>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop"></div>
    `;

    this.handleModal(modal);
    this.handleStarCheckbox(modal, movie);

    return modal;
  },

  handleModal(modal: HTMLDivElement) {
    modal?.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;

      if (element.className === 'modal-backdrop' || element.className === 'modal-close-btn') {
        modal.remove();
      }
    });
  },

  handleStarCheckbox(modal: HTMLDivElement, movie: MovieType) {
    const checkboxes = $$('.vote-box input', modal);

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
    const starIcons = $$('.vote-box img');
    const scoreMessage = $('.vote-container .movie-text:last-child');
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

export default Modal;
