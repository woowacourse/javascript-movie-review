import UserRating from './UserRating';

import { starEmptyImage } from '../../assets/images';
import { $ } from '../../utils/dom';

const UserRatingButtonList = {
  template() {
    return `
      <div class="user-rating-buttons">
        <button type="button" value="2" data-rating-desc="최악이예요">
          <img src=${starEmptyImage} alt="별점" />
        </button>
        <button type="button" value="4" data-rating-desc="별로예요">
          <img src=${starEmptyImage} alt="별점" />
        </button>
        <button type="button" value="6" data-rating-desc="보통이에요">
          <img src=${starEmptyImage} alt="별점" />
        </button>
        <button type="button" value="8" data-rating-desc="재미있어요">
          <img src=${starEmptyImage} alt="별점" />
        </button>
        <button type="button" value="10" data-rating-desc="명작이에요">
          <img src=${starEmptyImage} alt="별점" />
        </button>
      </div>
    `;
  },

  setEvent() {
    const userRatingButtons = $<HTMLDivElement>('.user-rating-buttons');

    userRatingButtons.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLElement)) return;

      const ratingButton = event.target.closest('button');
      const ratingScore = ratingButton?.value;
      const ratingDesc = ratingButton?.dataset.ratingDesc;

      if (!ratingScore || !ratingDesc) return;

      UserRating.renderRating(ratingScore, ratingDesc);
    });
  },
};

export default UserRatingButtonList;
