import { starEmptyImage, starFilledImage } from '../../assets/images';

const UserRatingButton = {
  template(score: string, desc: string, index: number, imagePath: string = starEmptyImage) {
    return `
      <button type="button" value=${score} data-rating-desc=${desc} data-index=${index}>
        <img src=${imagePath} alt="${score}점" />
      </button>
    `;
  },

  toggleStarImage(target: HTMLButtonElement, isFilled: boolean) {
    const starImage = target.querySelector<HTMLImageElement>('img');

    if (starImage === null) return;

    if (isFilled) {
      starImage.src = starFilledImage;
      return;
    }

    starImage.src = starEmptyImage;
  },
};

export default UserRatingButton;
