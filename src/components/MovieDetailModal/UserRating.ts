import UserRatingButtonList from './UserRatingButtonList';

import { $ } from '../../utils/dom';
import type { RatedMovie } from '../../types/domain';

const UserRating = {
  template({ score, desc }: RatedMovie) {
    return `
      <div class="user-rating-container">
        <p>내 별점</p>
        ${UserRatingButtonList.template(score)}
        <p class="user-rating-score">${score}</p>
        <p class="user-rating-desc">${desc}</p>
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
