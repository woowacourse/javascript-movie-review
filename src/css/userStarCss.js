/* eslint-disable no-shadow */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */

function addHoverEventToStar() {
  const STAR_COUNT = 5;
  Array(STAR_COUNT)
    .fill(null)
    .forEach((_, index) => {
      const star = document.querySelector(`span[data-star-id="${index}"]`);
      star.addEventListener('mouseover', () => {
        Array(index + 1)
          .fill(null)
          .forEach((_, index2) => {
            const span = document.querySelector(`span[data-star-id="${index2}"]`);
            const img = span.querySelector('img');
            img.style.filter = 'brightness(120%)';
          });
      });
      star.addEventListener('mouseout', () => {
        Array(index + 1)
          .fill(null)
          .forEach((_, index2) => {
            const span = document.querySelector(`span[data-star-id="${index2}"]`);
            const img = span.querySelector('img');
            img.style.filter = 'brightness(100%)';
          });
      });
    });
}

export default addHoverEventToStar;
