import UserRating from './UserRating';
import UserRatingButton from './UserRatingButton';

import { $ } from '../../utils/dom';
import { USER_RATING_MESSAGE } from '../../constants/message';

const UserRatingButtonList = {
  template(initScore: string) {
    return `
      <div class="user-rating-buttons">
        ${USER_RATING_MESSAGE.map(({ score, desc }) => UserRatingButton.template(score, desc, initScore)).join('')}
      </div>
    `;
  },

  setEvent() {
    const userRatingButtons = $<HTMLDivElement>('.user-rating-buttons');

    userRatingButtons.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLElement)) return;

      const {
        value: score,
        dataset: { ratingDesc },
      } = event.target.closest('button') as HTMLButtonElement;

      if (!ratingDesc) return;

      UserRatingButtonList.render(Number(score));
      UserRating.renderRating(score, ratingDesc);
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
