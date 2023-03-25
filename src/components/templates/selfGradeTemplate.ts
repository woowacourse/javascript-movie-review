import { IMAGES } from '../../assets/images';
import { scoreMessageTemplate } from '../../constants/template';

export const generateSelfGradeTemplate = (id: number) => {
  const scoreImageTemplate = Array.from({ length: 5 }, (_, index) => {
    /* html */
    return `
			<img
				class="score-image"
				id="${index + 1}"
				src="${id > index ? IMAGES.STAR_FILLED : IMAGES.STAR_EMPTY}"
				aria-label="score"
			/>
		`;
  }).join('');

  /* html */
  return `
		<p class="score-title">내 별점</p>
		${scoreImageTemplate}
		<p class="score-message">${scoreMessageTemplate[id - 1]}<p>
	`;
};
