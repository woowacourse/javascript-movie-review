import UserRatingButtonList from './UserRatingButtonList';

import { $ } from '../../utils/dom';

const UserRating = {
  template() {
    return `
      <div class="user-rating-container">
        <p>내 별점</p>
        ${UserRatingButtonList.template()}
        <p class="user-rating-score"></p>
        <p class="user-rating-desc">별점 매기기</p>
      </div>
    `;
  },

  renderRating(score: string, desc: string) {
    const ratingScore = $<HTMLParagraphElement>('.user-rating-score');
    const ratingDesc = $<HTMLParagraphElement>('.user-rating-desc');

    ratingScore.innerText = score;
    ratingDesc.innerText = desc;
  },
};

export default UserRating;
