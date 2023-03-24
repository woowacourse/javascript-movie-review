import UserRating from './UserRating';
import UserRatingButton from './UserRatingButton';

import { $ } from '../../utils/dom';
import { USER_RATING_MESSAGE } from '../../constants/message';

const UserRatingButtonList = {
  template() {
    return `
      <div class="user-rating-buttons">
        ${USER_RATING_MESSAGE.map(({ score, desc }, index) => UserRatingButton.template(score, desc, index)).join('')}
      </div>
    `;
  },

  setEvent() {
    const userRatingButtons = $<HTMLDivElement>('.user-rating-buttons');

    userRatingButtons.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (event.target instanceof HTMLDivElement) return;

      const { value: score, dataset } = event.target.closest('button') as HTMLButtonElement;
      const { ratingDesc, index } = dataset;

      if (!ratingDesc || !index) return;

      UserRatingButtonList.render(Number(index));
      UserRating.renderRating(score, ratingDesc);
    });
  },

  render(targetIndex: number) {
    const userRatingButtons = $<HTMLDivElement>('.user-rating-buttons');

    [...userRatingButtons.children].forEach((child, index) => {
      if (child instanceof HTMLButtonElement) {
        const isFilled = index <= targetIndex;
        UserRatingButton.toggleStarImage(child, isFilled);
      }
    });
  },
};

export default UserRatingButtonList;
