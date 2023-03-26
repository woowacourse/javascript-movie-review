import UserRating from './UserRating';
import UserRatingButton from './UserRatingButton';

import { $ } from '../../utils/dom';
import { USER_RATING_MESSAGE } from '../../constants/message';
import MovieDetailModal from '.';
import ratedMovieStates from '../../states/ratedMovies';

const UserRatingButtonList = {
  template(initScore: string) {
    return `
      <div class="user-rating-buttons">
        ${USER_RATING_MESSAGE.map(({ score, desc }) => UserRatingButton.template(score, desc, initScore)).join('')}
      </div>
    `;
  },

  setEvent() {
    const {
      dataset: { movieId },
    } = $<HTMLDivElement>('.modal-content');
    const userRatingButtons = $<HTMLDivElement>('.user-rating-buttons');

    userRatingButtons.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLElement)) return;

      const {
        value: score,
        dataset: { desc },
      } = event.target.closest('button') as HTMLButtonElement;

      if (!desc) return;

      UserRatingButtonList.render(Number(score));
      UserRating.renderRating(score, desc);

      ratedMovieStates.update({ id: Number(movieId), score, desc });
    });
  },

  render(targetScore: number) {
    const userRatingButtons = $<HTMLDivElement>('.user-rating-buttons');

    [...userRatingButtons.children].forEach((child) => {
      if (child instanceof HTMLButtonElement) {
        const isFilled = Number(child.value) <= targetScore;
        UserRatingButton.toggleStarImage(child, isFilled);
      }
    });
  },
};

export default UserRatingButtonList;
