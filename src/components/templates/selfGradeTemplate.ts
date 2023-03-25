import { IMAGES } from '../../assets/images';

const scoreMessageTemplate = ['최악이예요', '별로예요', '보통이예요', '재미있어요', '명작이예요'];

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
		<p>${scoreMessageTemplate[id - 1]}<p>
	`;
};
