import { IMAGES } from '../../assets/images';
import { scoreMessageTemplate } from '../../constants/template';
import { getMovieSelfScore } from '../../domains/localStorage';

export const generateSelfGradeTemplate = (movieId: string) => {
  const clickedId = getMovieSelfScore(movieId);

  const scoreImageTemplate = Array.from({ length: 5 }, (_, index) => {
    /* html */
    return `
			<img
				class="score-image"
				id="${index + 1}"
				src="${clickedId > index ? IMAGES.STAR_FILLED : IMAGES.STAR_EMPTY}"
				aria-label="score"
			/>
		`;
  }).join('');

  /* html */
  return `
		<p class="score-title">내 별점</p>
		${scoreImageTemplate}
		<p class="score-message">${scoreMessageTemplate[clickedId]}<p>
	`;
};
